<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\MailLog;
use App\Models\SmtpServer;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $activeSmtp = SmtpServer::where('active', true)->count();
        $totalMailsSent = MailLog::where('status', 'sent')->count();

        // Deliverability calculation
        $totalAttempts = MailLog::count();
        $averageDeliverability = $totalAttempts > 0
            ? round((MailLog::where('status', 'sent')->count() / $totalAttempts) * 100, 1)
            : 0;

        // Revenue calculation (Sum of active user plans)
        $totalRevenue = DB::table('user_plans')
            ->join('plans', 'user_plans.plan_id', '=', 'plans.id')
            ->where('user_plans.is_active', true)
            ->sum('plans.price');

        // SMTP Statuses (Real data)
        $smtpStatuses = SmtpServer::all()->map(function ($server) {
            $lastHourCount = MailLog::where('smtp_server_id', $server->id)
                ->where('created_at', '>=', now()->subHour())
                ->count();

            $load = $server->max_per_hour > 0
                ? round(($lastHourCount / $server->max_per_hour) * 100)
                : 0;

            return [
                'name' => $server->host,
                'status' => $server->active ? 'Healthy' : 'Inactive',
                'load' => $load . '%'
            ];
        });

        // Chart Data (Last 7 Days Global)
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $count = MailLog::whereDate('created_at', $date)
                ->where('status', 'sent')
                ->count();

            $chartData[] = [
                'name' => $date->format('D'),
                'mails' => $count,
            ];
        }

        return Inertia::render('Admin/GlobalStats', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'activeSmtp' => $activeSmtp,
                'totalMailsSent' => $totalMailsSent,
                'averageDeliverability' => $averageDeliverability,
                'totalRevenue' => $totalRevenue,
                'smtpStatuses' => $smtpStatuses,
                'chartData' => $chartData,
            ]
        ]);
    }
}

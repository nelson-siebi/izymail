<?php

namespace App\Http\Controllers;

use App\Models\MailLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $plan = $user->plans()->wherePivot('is_active', true)->first();

        $dailyLimit = $plan ? $plan->max_mails_per_day : config('izymail.default_daily_limit', 100);

        $dailySent = MailLog::where('user_id', $user->id)
            ->whereDate('created_at', Carbon::today())
            ->where('sandbox', false)
            ->count();

        $totalSent = MailLog::where('user_id', $user->id)
            ->where('status', 'sent')
            ->count();

        $failedCount = MailLog::where('user_id', $user->id)
            ->where('status', 'failed')
            ->count();

        // Chart Data (Last 7 Days)
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $count = MailLog::where('user_id', $user->id)
                ->whereDate('created_at', $date)
                ->where('status', 'sent')
                ->count();
            $failed = MailLog::where('user_id', $user->id)
                ->whereDate('created_at', $date)
                ->where('status', 'failed')
                ->count();

            $chartData[] = [
                'name' => $date->format('D'),
                'sent' => $count,
                'failed' => $failed,
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'dailySent' => $dailySent,
                'dailyLimit' => $dailyLimit,
                'totalSent' => $totalSent,
                'failedCount' => $failedCount,
                'chartData' => $chartData,
            ]
        ]);
    }
}

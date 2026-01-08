<?php

namespace App\Http\Controllers;

use App\Models\MailLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MailHistoryController extends Controller
{
    public function index(Request $request)
    {
        $query = MailLog::where('user_id', $request->user()->id);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('to_email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $logs = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('MailHistory', [
            'logs' => $logs,
            'filters' => $request->only(['search', 'status'])
        ]);
    }
}

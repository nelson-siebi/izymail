<?php

namespace App\Services;

use App\Models\User;
use App\Models\MailLog;
use Carbon\Carbon;

class QuotaService
{
    /**
     * Check if user can send email (Daily limit).
     *
     * @param User $user
     * @return bool
     */
    public function canSend(User $user): bool
    {
        $plan = $user->plans()->wherePivot('is_active', true)->first();

        // Default free limit if no plan
        if (!$plan) {
            $dailyCount = MailLog::where('user_id', $user->id)
                ->whereDate('created_at', Carbon::today())
                ->count();
            return $dailyCount < config('izymail.default_daily_limit', 100);
        }

        $dailyCount = MailLog::where('user_id', $user->id)
            ->whereDate('created_at', Carbon::today())
            ->count();

        return $dailyCount < $plan->max_mails_per_day;
    }

    /**
     * Check if sandbox usage is within limits (if applicable).
     *
     * @param User $user
     * @return bool
     */
    public function checkSandboxLimit(User $user): bool
    {
        $plan = $user->plans()->wherePivot('is_active', true)->first();

        if (!$plan || is_null($plan->sandbox_limit)) {
            // If no plan, use default sandbox limit
            if (!$plan) {
                $dailySandboxCount = MailLog::where('user_id', $user->id)
                    ->where('sandbox', true)
                    ->whereDate('created_at', Carbon::today())
                    ->count();
                return $dailySandboxCount < config('izymail.default_sandbox_limit', 50);
            }
            return true;
        }

        $dailySandboxCount = MailLog::where('user_id', $user->id)
            ->where('sandbox', true)
            ->whereDate('created_at', Carbon::today())
            ->count();

        return $dailySandboxCount < $plan->sandbox_limit;
    }
}

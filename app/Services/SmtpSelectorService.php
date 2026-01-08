<?php

namespace App\Services;

use App\Models\SmtpServer;
use App\Models\MailLog;
use Carbon\Carbon;

class SmtpSelectorService
{
    /**
     * Get the best available SMTP server.
     * Logic:
     * 1. Active servers.
     * 2. Not exceeding hourly limit.
     * 3. Highest priority first, then least loaded.
     *
     * @return SmtpServer|null
     */
    public function getOptimalServer(): ?SmtpServer
    {
        // Get all active servers ordered by priority
        $servers = SmtpServer::where('active', true)
            ->orderBy('priority', 'desc')
            ->get();

        foreach ($servers as $server) {
            if ($this->hasHourlyCapacity($server)) {
                return $server;
            }
        }

        return null;
    }

    /**
     * Check if server has capacity for the current hour.
     *
     * @param SmtpServer $server
     * @return bool
     */
    protected function hasHourlyCapacity(SmtpServer $server): bool
    {
        $count = MailLog::where('smtp_server_id', $server->id)
            ->where('created_at', '>=', Carbon::now()->subHour())
            ->count();

        return $count < $server->max_per_hour;
    }
}

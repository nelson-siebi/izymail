<?php

namespace App\Services;

use App\Models\User;
use App\Models\MailLog;
use App\Jobs\SendEmailJob;
use Illuminate\Support\Facades\Log;

class MailService
{
    protected SmtpSelectorService $smtpSelector;
    protected QuotaService $quotaService;

    public function __construct(
        SmtpSelectorService $smtpSelector,
        QuotaService $quotaService
    ) {
        $this->smtpSelector = $smtpSelector;
        $this->quotaService = $quotaService;
    }

    /**
     * Send an email (Dispatches Job).
     *
     * @param User|null $user The user sending the email (null for system emails)
     * @param string $to
     * @param string $subject
     * @param string $content
     * @param array $attachments
     * @param bool $sandbox
     * @param string|null $fromName
     * @return bool
     * @throws \Exception
     */
    public function send(?User $user, string $to, string $subject, string $content, array $attachments = [], bool $sandbox = false, ?string $fromName = null): bool
    {
        // 1. Check Quota (if user is provided)
        if ($user) {
            if (!$this->quotaService->canSend($user)) {
                throw new \Exception("Daily email quota exceeded.");
            }
            if ($sandbox && !$this->quotaService->checkSandboxLimit($user)) {
                throw new \Exception("Sandbox quota exceeded.");
            }
        }

        // 2. Select SMTP Server
        $smtpServer = $this->smtpSelector->getOptimalServer();

        if (!$smtpServer) {
            Log::error("No active SMTP server available.");
            throw new \Exception("No SMTP server available.");
        }

        // 3. Log initial request (Pending)
        $log = MailLog::create([
            'user_id' => $user ? $user->id : null,
            'smtp_server_id' => $smtpServer->id,
            'from_name' => $fromName,
            'to_email' => $to,
            'subject' => $subject,
            'status' => 'pending',
            'sandbox' => $sandbox,
        ]);

        // 4. Dispatch Job
        SendEmailJob::dispatch(
            $log->id,
            $smtpServer->id,
            $to,
            $subject,
            $content, // HTML content
            null, // Text content (optional, can be passed later)
            $attachments,
            $fromName
        );

        return true;
    }
}

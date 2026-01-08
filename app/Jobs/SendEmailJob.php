<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\MailLog;
use App\Models\SmtpServer;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $logId;
    protected $smtpServerId;
    protected $to;
    protected $subject;
    protected $html;
    protected $text;
    protected $attachments;
    protected $fromName;

    public function __construct(int $logId, int $smtpServerId, string $to, string $subject, string $html, ?string $text = null, array $attachments = [], ?string $fromName = null)
    {
        $this->logId = $logId;
        $this->smtpServerId = $smtpServerId;
        $this->to = $to;
        $this->subject = $subject;
        $this->html = $html;
        $this->text = $text;
        $this->attachments = $attachments;
        $this->fromName = $fromName;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $log = MailLog::find($this->logId);
        if (!$log) {
            Log::error("MailLog not found for ID: {$this->logId}");
            return;
        }

        $server = SmtpServer::find($this->smtpServerId);
        if (!$server) {
            $log->update(['status' => 'failed', 'error_message' => 'SMTP Server not found']);
            return;
        }

        // Configure Mailer Dynamically
        $config = [
            'transport' => 'smtp',
            'host' => $server->host,
            'port' => $server->port,
            'encryption' => $server->encryption ?? (($server->port == 587) ? 'tls' : null),
            'username' => $server->username,
            'password' => $server->password,
            'timeout' => 30, // Ajout d'un timeout
            'local_domain' => env('MAIL_EHLO_DOMAIN', 'localhost'), // Fallback important
        ];

        Log::debug("Configuring dynamic mailer:", [
            'host' => $config['host'],
            'port' => $config['port'],
            'encryption' => $config['encryption'],
            'username' => $config['username'],
        ]);

        Config::set('mail.mailers.dynamic_smtp', $config);
        Config::set('mail.default', 'dynamic_smtp');

        // On purge le mailer pour forcer Laravel à le recréer avec la nouvelle config
        Mail::purge('dynamic_smtp');
        Mail::purge(config('mail.default'));

        try {
            if ($log->sandbox) {
                // Determine sandbox behavior? 
                // Usually sandbox means 'don't send' or 'send to trap'.
                // If sandbox is true, maybe we just log success without sending?
                // Or maybe we send to a specific sandbox address?
                // For now, let's simulate success.
                sleep(1); // Simulate network
                $log->update(['status' => 'sent', 'error_message' => 'Sandbox Mode - Simulated Send']);
                return;
            }

            Mail::html($this->html, function ($message) use ($server) {
                $message->to($this->to)
                    ->subject($this->subject);

                if ($this->fromName) {
                    $message->from($server->username, $this->fromName);
                }

                // Add plain text version if provided
                if ($this->text) {
                    $message->text($this->text);
                }

                foreach ($this->attachments as $attachment) {
                    $message->attach($attachment);
                }
            });

            $log->update(['status' => 'sent']);

        } catch (\Exception $e) {
            $log->update([
                'status' => 'failed',
                'error_message' => $e->getMessage()
            ]);
            Log::error("Mail Send Failed: " . $e->getMessage());
            $this->fail($e); // Mark job as failed in queue
        }
    }
}

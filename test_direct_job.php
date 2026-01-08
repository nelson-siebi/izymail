<?php

require __DIR__ . '/vendor/autoload.php';

use App\Models\User;
use App\Models\SmtpServer;
use App\Models\MailLog;
use App\Jobs\SendEmailJob;

// Initialize Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "--- Direct Job Test ---\n";

$user = User::first();
$server = SmtpServer::where('active', true)->first();

if (!$user || !$server) {
    die("Need a user and an active SMTP server to test.\n");
}

// 1. Create a log
$log = MailLog::create([
    'user_id' => $user->id,
    'smtp_server_id' => $server->id,
    'to_email' => 'nelsonsiebi@gmail.com',
    'subject' => 'Direct Job Test - Styled',
    'status' => 'pending',
    'sandbox' => false,
]);

echo "Created Log ID: {$log->id}\n";

$html = "<h1>Test Direct</h1><p style='color: blue;'>Si vous voyez ceci en bleu, le HTML fonctionne.</p>";

// 2. Dispatch Job
echo "Dispatching job...\n";
SendEmailJob::dispatch(
    $log->id,
    $server->id,
    'nelsonsiebi@gmail.com',
    'Direct Job Test - Styled',
    $html,
    'Fallback text version',
    [],
    'Nelmail Debug'
);

echo "Job dispatched. Please ensure 'php artisan queue:work' is running.\n";
echo "Or run 'php artisan queue:listen --tries=1' in another terminal.\n";

<?php

use App\Models\User;
use App\Models\Plan;
use App\Models\UserPlan;
use App\Models\SmtpServer;
use App\Services\MailService;
use App\Services\SmtpSelectorService;
use App\Services\QuotaService;
use Illuminate\Support\Facades\Log;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    // 1. Setup Data
    echo "Setting up test data...\n";
    $user = User::firstOrCreate(
        ['email' => 'testlogic@example.com'],
        ['name' => 'Logic Tester', 'password' => bcrypt('password')]
    );

    $plan = Plan::firstOrCreate(
        ['name' => 'Test Plan'],
        ['price' => 10, 'max_mails_per_day' => 5, 'max_attachment_size_mb' => 10, 'sandbox_limit' => 20]
    );

    UserPlan::updateOrCreate(
        ['user_id' => $user->id, 'plan_id' => $plan->id],
        ['start_date' => now(), 'is_active' => true]
    );

    $smtp = SmtpServer::firstOrCreate(
        ['host' => 'smtp.mailtrap.io'],
        [
            'port' => 2525,
            'username' => 'test',
            'password' => 'test',
            'active' => true,
            'max_per_hour' => 100,
            'priority' => 10
        ]
    );

    // 2. Instantiate Service
    $mailService = new MailService(new SmtpSelectorService, new QuotaService);

    // 3. Test One Send (Sandbox)
    echo "Sending Sandbox Email...\n";
    $mailService->send($user, 'recipient@example.com', 'Test Subject', '<h1>Hello</h1>', [], true);

    // 4. Verify Log
    $log = \App\Models\MailLog::latest()->first();
    echo "Log created: ID {$log->id}, Status: {$log->status}, Sandbox: {$log->sandbox}\n";

    if ($log->to_email === 'recipient@example.com' && $log->sandbox) {
        echo "SUCCESS: Sandbox email logged correctly.\n";
    } else {
        echo "FAILURE: Log mismatch.\n";
    }

    // 5. Quota Test (Loop)
    echo "Testing Quota Limit (Limit: 5)...\n";
    try {
        for ($i = 0; $i < 6; $i++) {
            $mailService->send($user, "recip$i@example.com", "Sub $i", "Content", []);
            echo "Sent email " . ($i + 1) . "\n";
        }
    } catch (\Exception $e) {
        echo "Expected Exception caught: " . $e->getMessage() . "\n";
        if ($e->getMessage() === "Daily email quota exceeded.") {
            echo "SUCCESS: Quota enforcement working.\n";
        } else {
            echo "FAILURE: Unexpected exception message.\n";
        }
    }

} catch (\Exception $e) {
    echo "CRITICAL ERROR: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}

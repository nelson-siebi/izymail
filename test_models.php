<?php

use App\Models\SmtpServer;
use Illuminate\Support\Facades\Crypt;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    echo "Creating SMTP Server...\n";
    $server = SmtpServer::create([
        'host' => 'smtp.example.com',
        'port' => '587',
        'encryption' => 'tls',
        'username' => 'user@example.com',
        'password' => 'secret_password_123',
        'active' => true,
    ]);

    echo "SMTP Server ID: {$server->id}\n";

    // Refresh from DB to correct confirm encryption
    $server = SmtpServer::find($server->id);

    // Check if password matches (getter should decrypt it)
    if ($server->password === 'secret_password_123') {
        echo "Decryption successful: {$server->password}\n";
    } else {
        echo "Decryption failed or raw value: {$server->password}\n";
    }

    // Check Raw DB value
    $raw = \Illuminate\Support\Facades\DB::table('smtp_servers')->where('id', $server->id)->value('password');
    echo "Raw DB Value (should be encrypted string): " . substr($raw, 0, 20) . "...\n";

    if ($raw !== 'secret_password_123') {
        echo "Encryption verified in DB.\n";
    } else {
        echo "WARNING: Password stored in plain text!\n";
    }

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

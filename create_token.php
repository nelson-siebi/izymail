<?php

use App\Models\User;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = User::where('email', 'testlogic@example.com')->first();

if (!$user) {
    echo "User not found. Run test_logic.php first.\n";
    exit(1);
}

$token = $user->createToken('test-token')->plainTextToken;
echo $token;

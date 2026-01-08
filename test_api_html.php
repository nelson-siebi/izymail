<?php

require __DIR__ . '/vendor/autoload.php';

use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;

// Initialize Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "--- REST API HTML Email Test (Sanctum) ---\n";

// 1. Get a token
$user = User::first();
$tokenRecord = PersonalAccessToken::where('tokenable_id', $user->id)->first();

if (!$tokenRecord) {
    // Create a temporary token if none exists
    $token = $user->createToken('TestToken')->plainTextToken;
    echo "Created new temporary token.\n";
} else {
    // We can't get the plain text token from the database, so let's just create a new one for testing
    $token = $user->createToken('TemporaryTestToken')->plainTextToken;
    echo "Created temporary token for testing.\n";
}

// 2. Prepare Payload
$payload = [
    'to' => 'nelsonsiebi@gmail.com',
    'subject' => 'REST API Test - Styled HTML',
    'html' => '<h1>Test REST API</h1><p>Ceci est un test via <b>API REST</b> avec support HTML.</p>',
    'from_name' => 'Nelmail API Test'
];

// 3. Send Request
$url = 'http://localhost:8089/api/send';
echo "Sending POST request to {$url}...\n";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $token,
    'Accept: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status: {$httpCode}\n";
echo "Response: {$response}\n";

if ($httpCode === 200) {
    echo "✓ SUCCESS: API call accepted.\n";
} else {
    echo "✗ FAILED: API call rejected.\n";
}

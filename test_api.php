<?php

require __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\Client;

$token = trim(shell_exec('php create_token.php'));
echo "Using Token: " . substr($token, 0, 10) . "...\n";

$client = new Client([
    'base_uri' => 'http://127.0.0.1:8000/api/',
    'headers' => [
        'Authorization' => 'Bearer ' . $token,
        'Accept' => 'application/json',
    ],
    'http_errors' => false // Don't throw exception on 4xx/5xx
]);

echo "1. Testing GET /admin/smtp-servers...\n";
$response = $client->get('admin/smtp-servers');
echo "Status: " . $response->getStatusCode() . "\n";
file_put_contents('admin_error.log', $response->getBody());

if ($response->getStatusCode() === 200) {
    echo "SUCCESS: Admin Route Accessible.\n";
} else {
    echo "FAILURE: Admin Route Error. See admin_error.log\n";
}

echo "\n2. Testing POST /send...\n";
$response = $client->post('send', [
    'json' => [
        'to' => 'api_test@example.com',
        'subject' => 'API Test',
        'content' => 'Hello from API',
        'sandbox' => true
    ]
]);

echo "Status: " . $response->getStatusCode() . "\n";
file_put_contents('api_error.log', $response->getBody());


if ($response->getStatusCode() === 200) {
    echo "SUCCESS: Email queued via API.\n";
} elseif ($response->getStatusCode() === 500 && str_contains($response->getBody(), 'quota')) {
    echo "SUCCESS: Quota limit reached (Expected if logic test maxed it out).\n";
} else {
    echo "FAILURE: Unexpected response.\n";
}

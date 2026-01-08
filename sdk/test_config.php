<?php

// Manual Autoload simulation
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/src/Config.php';
require_once __DIR__ . '/src/Exceptions/IzymailException.php';
require_once __DIR__ . '/src/Message.php';
require_once __DIR__ . '/src/Izymail.php';

use Izymail\Config;
use Izymail\Izymail;

echo "--- Testing SDK Configuration System ---\n";

// 1. Test Static Configuration
echo "Testing Static Configuration...\n";
Config::setApiKey('static_key_123');
Config::setBaseUrl('http://my-local-server.test/api');

$sdk = new Izymail();
$reflection = new ReflectionClass($sdk);
$apiKeyProp = $reflection->getProperty('apiKey');
$apiKeyProp->setAccessible(true);
$baseUrlProp = $reflection->getProperty('baseUrl');
$baseUrlProp->setAccessible(true);

if ($apiKeyProp->getValue($sdk) === 'static_key_123' && $baseUrlProp->getValue($sdk) === 'http://my-local-server.test/api') {
    echo "SUCCESS: Static configuration correctly applied to Izymail client.\n";
} else {
    echo "FAILED: Static configuration not applied.\n";
    echo "Key: " . $apiKeyProp->getValue($sdk) . "\n";
    echo "URL: " . $baseUrlProp->getValue($sdk) . "\n";
}

// 2. Test Environment Configuration (Simulation)
echo "\nTesting Environment Configuration...\n";
putenv('IZYMAIL_API_KEY=env_key_456');
putenv('IZYMAIL_BASE_URL=http://env-server.test/api');

// Reset static config to test env fallback
$reflectionConfig = new ReflectionClass(Config::class);
$staticKeyProp = $reflectionConfig->getProperty('apiKey');
$staticKeyProp->setAccessible(true);
$staticKeyProp->setValue(null, null); // Correct way to set static property in PHP 8.1+

$staticBaseUrlProp = $reflectionConfig->getProperty('baseUrl');
$staticBaseUrlProp->setAccessible(true);
$staticBaseUrlProp->setValue(null, 'https://izymail.nelsius.com/api'); // Reset to default to force env check

$sdkEnv = new Izymail();
if ($apiKeyProp->getValue($sdkEnv) === 'env_key_456' && $baseUrlProp->getValue($sdkEnv) === 'http://env-server.test/api') {
    echo "SUCCESS: Environment variables correctly fallback.\n";
} else {
    echo "FAILED: Environment fallback failed.\n";
}

echo "\nVerification Completed.\n";

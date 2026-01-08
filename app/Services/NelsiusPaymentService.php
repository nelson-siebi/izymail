<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NelsiusPaymentService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('izymail.nelsius_api_key');
        $this->baseUrl = config('izymail.nelsius_base_url');
    }

    /**
     * Initiate a payment via Nelsius API.
     *
     * @param float $amount
     * @param string $currency
     * @param string $email
     * @param string $description
     * @param string $returnUrl
     * @return array
     * @throws \Exception
     */
    public function initiatePayment($amount, $currency, $email, $description, $returnUrl)
    {
        $url = "{$this->baseUrl}/payments/mobile-money";

        $payload = [
            'operator' => 'global',
            'amount' => $amount,
            'currency' => $currency,
            'email' => $email,
            'description' => $description,
            'success_url' => $returnUrl,
            // 'cancel_url' => ... could execute cancel route
        ];

        Log::info('Initiating Nelsius Payment', ['url' => $url, 'payload' => $payload]);

        $response = Http::withHeaders([
            'X-API-KEY' => $this->apiKey,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])->post($url, $payload);

        if ($response->successful()) {
            return $response->json();
        }

        Log::error('Nelsius Payment Failed', ['status' => $response->status(), 'body' => $response->body()]);
        throw new \Exception('Payment initiation failed: ' . $response->body());
    }

    /**
     * Verify payment status via Nelsius API.
     * 
     * @param string $reference
     * @return array
     */
    public function verifyPayment($reference)
    {
        $url = "{$this->baseUrl}/payments/mobile-money/{$reference}";

        Log::info('Verifying Nelsius Payment', ['url' => $url]);

        $response = Http::withHeaders([
            'X-API-KEY' => $this->apiKey,
            'Accept' => 'application/json',
        ])->get($url);

        if ($response->successful()) {
            return $response->json();
        }

        Log::error('Nelsius Verification Failed', ['status' => $response->status(), 'body' => $response->body()]);
        return ['success' => false, 'error' => $response->body()];
    }
}

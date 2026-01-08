<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    protected string $apiKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = env('NELSIUS_PAY_API_KEY');
        $this->baseUrl = env('NELSIUS_PAY_BASE_URL', 'https://api.nelsiuspay.com/api/v1');
    }

    /**
     * Initiate a mobile money payment.
     */
    public function initiate(User $user, Plan $plan, string $phone, string $operator)
    {
        try {
            $response = Http::withHeaders([
                'X-API-KEY' => $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post("{$this->baseUrl}/payments/mobile-money", [
                        'operator' => $operator,
                        'phone' => $phone,
                        'amount' => $plan->price,
                        'currency' => 'XAF',
                        'description' => "Achat du plan Izymail : {$plan->name}",
                    ]);

            if ($response->successful()) {
                $data = $response->json();

                if ($data['success']) {
                    // Create local payment record
                    return Payment::create([
                        'user_id' => $user->id,
                        'plan_id' => $plan->id,
                        'reference' => $data['data']['reference'],
                        'amount' => $plan->price,
                        'phone' => $phone,
                        'operator' => $operator,
                        'status' => 'pending',
                    ]);
                }
            }

            Log::error("Nelsius Pay Initiation Failed:", ['response' => $response->body()]);
            return null;

        } catch (\Exception $e) {
            Log::error("PaymentService Exception:", ['message' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Verify a payment status.
     */
    public function verify(string $reference)
    {
        try {
            $response = Http::withHeaders([
                'X-API-KEY' => $this->apiKey,
            ])->get("{$this->baseUrl}/payments/mobile-money/{$reference}");

            if ($response->successful()) {
                $data = $response->json();

                if ($data['success']) {
                    $payment = Payment::where('reference', $reference)->first();
                    if ($payment && $data['data']['status'] === 'successful') {
                        $this->completePayment($payment, $data['data']);
                    }
                    return $data['data'];
                }
            }

            return null;

        } catch (\Exception $e) {
            Log::error("PaymentService Verify Exception:", ['message' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Complete the payment process locally.
     */
    public function completePayment(Payment $payment, array $data)
    {
        if ($payment->status === 'successful')
            return;

        $payment->update([
            'status' => 'successful',
            'paid_at' => $data['paid_at'] ?? now(),
        ]);

        // Activate user plan
        $plan = $payment->plan;
        $user = $payment->user;

        // Desactivate old plans
        $user->plans()->updateExistingPivot($user->plans->pluck('id'), ['is_active' => false]);

        // Attach/Update new plan
        $user->plans()->syncWithoutDetaching([
            $plan->id => [
                'start_date' => now(),
                'end_date' => now()->addMonth(),
                'is_active' => true,
            ]
        ]);

        Log::info("Plan activated for user {$user->id} via Payment {$payment->id}");
    }
}

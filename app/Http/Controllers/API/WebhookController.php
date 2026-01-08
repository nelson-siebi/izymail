<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    protected PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Handle Nelsius Pay Webhook.
     */
    public function handleNelsiusPay(Request $request)
    {
        $data = $request->all();

        Log::info("Nelsius Pay Webhook Received:", $data);

        // Verification of the payload structure
        if (!isset($data['reference']) || !isset($data['status'])) {
            return response()->json(['message' => 'Invalid payload'], 400);
        }

        $payment = Payment::where('reference', $data['reference'])->first();

        if (!$payment) {
            Log::warning("Payment not found for reference: {$data['reference']}");
            return response()->json(['message' => 'Payment not found'], 404);
        }

        if ($data['status'] === 'successful') {
            $this->paymentService->completePayment($payment, $data);
            return response()->json(['message' => 'Payment processed and plan activated']);
        } elseif ($data['status'] === 'failed') {
            $payment->update(['status' => 'failed']);
            return response()->json(['message' => 'Payment marked as failed']);
        }

        return response()->json(['message' => 'Status ignored']);
    }
}

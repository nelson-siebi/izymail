<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    protected PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Initiate a payment for a plan.
     */
    public function initiate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'operator' => 'required|in:orange_money,mtn_money',
            'phone' => 'required|string',
        ]);

        $plan = Plan::find($validated['plan_id']);
        $user = $request->user();

        $payment = $this->paymentService->initiate(
            $user,
            $plan,
            $validated['phone'],
            $validated['operator']
        );

        if ($payment) {
            return response()->json([
                'success' => true,
                'message' => 'Paiement initié',
                'data' => [
                    'reference' => $payment->reference,
                    'status' => $payment->status,
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Échec de l\'initiation du paiement'
        ], 500);
    }

    /**
     * Check payment status.
     */
    public function status(string $reference): JsonResponse
    {
        $data = $this->paymentService->verify($reference);

        if ($data) {
            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Paiement introuvable ou erreur serveur'
        ], 404);
    }
}

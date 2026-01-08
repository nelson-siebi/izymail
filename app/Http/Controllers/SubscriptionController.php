<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\MailLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

use App\Services\NelsiusPaymentService; // Import service

class SubscriptionController extends Controller
{
    protected $paymentService;

    public function __construct(NelsiusPaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }
    public function index(Request $request)
    {
        $user = $request->user();
        $currentPlan = $user->plans()->wherePivot('is_active', true)->first();

        $dailySent = MailLog::where('user_id', $user->id)
            ->whereDate('created_at', Carbon::today())
            ->where('sandbox', false)
            ->count();

        return Inertia::render('Subscription', [
            'currentPlan' => $currentPlan,
            'usage' => [
                'dailySent' => $dailySent,
                'dailyLimit' => $currentPlan ? $currentPlan->max_mails_per_day : config('izymail.default_daily_limit', 100)
            ],
            'availablePlans' => Plan::where('id', '!=', $currentPlan?->id)->get()
        ]);
    }

    public function upgrade(Request $request, $planId)
    {
        $plan = Plan::findOrFail($planId);
        $user = $request->user();

        // 1. Initiate Payment
        try {
            $response = $this->paymentService->initiatePayment(
                $plan->price,
                'XAF', // Or dynamic depending on region, fixed XOF for now
                $user->email,
                "Abonnement Izymail - Plan {$plan->name}",
                route('subscription.callback', ['plan_id' => $plan->id])
            );

            if ($response['success'] && $response['data']['is_redirect']) {
                return Inertia::location($response['data']['payment_url']);
            }

            return back()->with('error', 'Impossible d\'initier le paiement. Veuillez réessayer.');

        } catch (\Exception $e) {
            return back()->with('error', 'Erreur de paiement: ' . $e->getMessage());
        }
    }

    public function callback(Request $request)
    {
        $planId = $request->query('plan_id');
        $reference = $request->query('ref');

        if (!$planId || !$reference) {
            return redirect()->route('subscription')->with('error', 'Paramètres de paiement manquants.');
        }

        // 2. Verify Payment
        $result = $this->paymentService->verifyPayment($reference);

        // Check verification success AND transaction status
        if (
            $result['success'] &&
            isset($result['data']['status']) &&
            ($result['data']['status'] === 'completed' || $result['data']['status'] === 'SUCCESS')
        ) {

            // 3. Activate Plan
            $plan = Plan::findOrFail($planId);
            $user = $request->user();

            // Deactivate previous plans
            $user->plans()->updateExistingPivot($user->plans->pluck('id'), ['is_active' => false]);

            // Attach new plan (or update if already exists)
            if ($user->plans()->where('plan_id', $plan->id)->exists()) {
                $user->plans()->updateExistingPivot($plan->id, [
                    'is_active' => true,
                    'start_date' => now(),
                    'end_date' => now()->addMonth(),
                ]);
            } else {
                $user->plans()->attach($plan->id, [
                    'is_active' => true,
                    'start_date' => now(),
                    'end_date' => now()->addMonth(),
                ]);
            }

            return redirect()->route('subscription')->with('success', "Paiement réussi ! Votre abonnement {$plan->name} est actif.");
        }

        return redirect()->route('subscription')->with('error', 'Le paiement n\'a pas pu être validé.');
    }
}

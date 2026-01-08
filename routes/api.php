<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MailController;
use App\Http\Controllers\API\Admin\SmtpController;
use App\Http\Controllers\API\Admin\PlanController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\WebhookController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Webhook (Public)
Route::post('/webhooks/nelsius-pay', [WebhookController::class, 'handleNelsiusPay']);

Route::middleware('auth:sanctum')->group(function () {
    // Send Email
    Route::post('/send', [MailController::class, 'send']);

    // Payments
    Route::prefix('payments')->group(function () {
        Route::post('/initiate', [PaymentController::class, 'initiate']);
        Route::get('/{reference}/status', [PaymentController::class, 'status']);
    });

    // Admin Routes
    Route::prefix('admin')->group(function () {
        Route::apiResource('smtp-servers', SmtpController::class);
        Route::apiResource('plans', PlanController::class);
    });
});

<?php

use Illuminate\Support\Facades\Route;

use App\Models\Plan;
use Inertia\Inertia;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MailHistoryController;
use App\Http\Controllers\ApiKeyController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\SmtpController;
use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\MailController;

Route::get('/', function () {
    return Inertia::render('Landing', [
        'plans' => Plan::all()
    ]);
});

Route::get('/about', function () {
    return Inertia::render('Static/About'); })->name('about');
Route::get('/careers', function () {
    return Inertia::render('Static/Careers'); })->name('careers');
Route::get('/privacy', function () {
    return Inertia::render('Static/Privacy'); })->name('privacy');
Route::get('/cookies', function () {
    return Inertia::render('Static/Cookies'); })->name('cookies');
Route::get('/blog', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog');
Route::get('/docs', function () {
    return Inertia::render('Documentation'); })->name('docs');

Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.update');

Route::get('/docs', function () {
    return Inertia::render('Documentation');
})->name('docs');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::get('/privacy', function () {
    return Inertia::render('Terms'); // Reusing terms for now as placeholder
})->name('privacy');

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::middleware(['auth'])->group(function () {
    Route::get('/verify-email', EmailVerificationPromptController::class)->name('verification.notice');
    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('verification.verify');
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware('throttle:6,1')->name('verification.send');

    Route::middleware(['verified'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('/send', [MailController::class, 'create'])->name('send');
        Route::post('/send', [MailController::class, 'send']);

        Route::get('/history', [MailHistoryController::class, 'index'])->name('history');

        Route::get('/api-keys', [ApiKeyController::class, 'index'])->name('api-keys');
        Route::post('/api-keys', [ApiKeyController::class, 'store']);
        Route::delete('/api-keys/{id}', [ApiKeyController::class, 'destroy']);

        Route::get('/subscription', [SubscriptionController::class, 'index'])->name('subscription');
        Route::post('/subscription/upgrade/{planId}', [SubscriptionController::class, 'upgrade'])->name('subscription.upgrade');
        Route::get('/subscription/callback', [SubscriptionController::class, 'callback'])->name('subscription.callback');

        Route::get('/settings', [\App\Http\Controllers\ProfileController::class, 'settings'])->name('settings');
        Route::get('/billing/invoices', [\App\Http\Controllers\ProfileController::class, 'invoices'])->name('billing.invoices');

        // Admin Routes
        Route::middleware(['admin'])->prefix('admin')->group(function () {
            Route::get('/stats', [AdminDashboardController::class, 'index'])->name('admin.stats');

            Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('admin.settings');
            Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('admin.settings.update');

            Route::get('/smtp', [SmtpController::class, 'index'])->name('admin.smtp');
            Route::post('/smtp', [SmtpController::class, 'store']);
            Route::patch('/smtp/{smtpServer}', [SmtpController::class, 'update']);
            Route::patch('/smtp/{smtpServer}/toggle', [SmtpController::class, 'toggle']);
            Route::delete('/smtp/{smtpServer}', [SmtpController::class, 'destroy']);
            Route::get('/plans', [PlanController::class, 'index'])->name('admin.plans');
            Route::post('/plans', [PlanController::class, 'store']);
            Route::patch('/plans/{plan}', [PlanController::class, 'update']);
            Route::delete('/plans/{plan}', [PlanController::class, 'destroy']);
            Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.users');
            Route::post('/users/{user}/plan', [\App\Http\Controllers\Admin\UserController::class, 'updatePlan']);
            Route::delete('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy']);
        });
    });
});

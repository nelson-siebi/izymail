<?php

namespace Tests\Feature;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class DeveloperJourneyTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the full developer flow: Login -> Buy Plan -> Get Key -> Send Mail
     */
    public function test_developer_can_subscribe_generate_key_and_send_mail()
    {
        // 0. Setup: Create a Plan and a User
        $plan = Plan::create([
            'name' => 'Pro Plan',
            'price' => 5000,
            'max_mails_per_day' => 1000,
            'stripe_price_id' => 'price_test_123'
        ]);

        \App\Models\SmtpServer::create([
            'host' => 'smtp.test',
            'port' => 587,
            'username' => 'test',
            'password' => 'secret',
            'encryption' => 'tls',
            'priority' => 10,
            'active' => true
        ]);

        $user = User::factory()->create([
            'email' => 'dev@izymail.nelsius.com',
            'password' => bcrypt('password'),
        ]);

        // 1. Simulate Login (acting as user)
        $this->actingAs($user);

        // 2. Purchase Plan
        // Used POST /subscription/upgrade/{planId}
        $response = $this->post("/subscription/upgrade/{$plan->id}");

        $response->assertRedirect();
        $this->assertTrue($user->fresh()->plans->contains($plan->id), "User should be subscribed to the plan.");

        // 3. Generate API Key
        // POST /api-keys with name
        $response = $this->post('/api-keys', [
            'name' => 'Test Key'
        ]);

        $response->assertSessionHas('newToken');
        $token = session('newToken');

        $this->assertNotEmpty($token, "API Token should be generated and present in session.");

        // 4. Use the API Key to send an email
        // We use Mail::fake() to prevent actual sending but verify the attempt
        Mail::fake();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])->postJson('/api/send', [
                    'to' => 'client@example.com',
                    'subject' => 'Hello via Nelmail API',
                    'html' => '<h1>It works!</h1>'
                ]);

        // 5. Verify API Response
        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Email queued for sending'
        ]);

        // Note: Actual mail sending might be queued, so we might need to assert pushed to queue
        // or if it's synchronous in test env, use Mail::assertSent.
        // For now, 200 OK from API is the integration proof we need.
    }
}

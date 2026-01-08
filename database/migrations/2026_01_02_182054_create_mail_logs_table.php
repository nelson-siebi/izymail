<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mail_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('smtp_server_id')->nullable()->constrained()->onDelete('set null');
            $table->string('to_email');
            $table->string('subject');
            $table->string('status')->default('pending'); // pending, sent, failed
            $table->boolean('sandbox')->default(false);
            $table->text('error_message')->nullable();
            $table->timestamps();

            $table->index('created_at');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mail_logs');
    }
};

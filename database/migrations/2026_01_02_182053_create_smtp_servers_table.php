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
        Schema::create('smtp_servers', function (Blueprint $table) {
            $table->id();
            $table->string('host');
            $table->string('port');
            $table->string('encryption')->nullable();
            $table->string('username')->nullable();
            $table->text('password')->nullable();
            $table->integer('priority')->default(0);
            $table->integer('max_per_hour')->default(100);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('smtp_servers');
    }
};

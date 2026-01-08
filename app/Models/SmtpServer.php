<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmtpServer extends Model
{
    use HasFactory;

    protected $fillable = [
        'host',
        'port',
        'encryption',
        'username',
        'password',
        'priority',
        'max_per_hour',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}

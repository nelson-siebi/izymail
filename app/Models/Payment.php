<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan_id',
        'reference',
        'amount',
        'phone',
        'operator',
        'status',
        'paid_at',
    ];

    /**
     * Get the user that made the payment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the plan being purchased.
     */
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}

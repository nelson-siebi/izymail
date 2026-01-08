<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'max_mails_per_day',
        'max_attachment_size_mb',
        'sandbox_limit',
    ];

    /**
     * Get the users subscribed to this plan.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_plans')
            ->withPivot('start_date', 'end_date', 'is_active')
            ->withTimestamps();
    }
}

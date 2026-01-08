<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'smtp_server_id',
        'from_name',
        'to_email',
        'subject',
        'status',
        'sandbox',
        'error_message',
    ];

    protected $casts = [
        'sandbox' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function smtpServer()
    {
        return $this->belongsTo(SmtpServer::class);
    }
}

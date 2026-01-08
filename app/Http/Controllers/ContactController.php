<?php

namespace App\Http\Controllers;

use App\Mail\ContactSubmission;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;

class ContactController extends Controller
{
    /**
     * Handle the contact form submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        $adminEmail = Setting::where('key', 'contact_email')->value('value') ?? config('mail.from.address');

        Mail::to($adminEmail)->send(new ContactSubmission($validated));

        return Redirect::back()->with('success', 'Votre message a été envoyé avec succès ! Nous vous répondrons dès que possible.');
    }
}

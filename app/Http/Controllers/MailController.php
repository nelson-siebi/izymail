<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MailService;
use Inertia\Inertia;

class MailController extends Controller
{
    protected MailService $mailService;

    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    public function create()
    {
        return Inertia::render('MailComposer');
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'to' => 'required|email',
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        try {
            $success = $this->mailService->send(
                $request->user(),
                $validated['to'],
                $validated['subject'],
                $validated['content'],
                $request->file('attachments', []),
                $request->boolean('sandbox'),
                null // fromName - can be added to the form later
            );

            if ($success) {
                return back()->with('success', 'Email envoyé avec succès.');
            }

            return back()->with('error', 'Échec de l\'envoi de l\'email.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}

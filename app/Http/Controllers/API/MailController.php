<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\MailService;
use Illuminate\Http\JsonResponse;

class MailController extends Controller
{
    protected MailService $mailService;

    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    /**
     * Send an email via API.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function send(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'to' => 'required|email',
            'subject' => 'required|string|max:255',
            'from_name' => 'nullable|string|max:255',
            'html' => 'required|string',
            'text' => 'nullable|string',
        ]);

        $success = $this->mailService->send(
            $request->user(),
            $validated['to'],
            $validated['subject'],
            $validated['html'],
            $request->input('attachments', []),
            $request->boolean('sandbox'),
            $validated['from_name'] ?? null
        );

        if ($success) {
            return response()->json(['message' => 'Email queued for sending'], 200);
        }

        return response()->json(['message' => 'Failed to send email'], 500);
    }
}

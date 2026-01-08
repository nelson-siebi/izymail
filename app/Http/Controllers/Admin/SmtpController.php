<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SmtpServer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SmtpController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/SmtpManager', [
            'servers' => SmtpServer::orderBy('priority', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'host' => 'required|string',
            'port' => 'required|integer',
            'username' => 'required|string',
            'password' => 'required|string',
            'encryption' => 'required|string|in:tls,ssl,none',
            'priority' => 'required|integer',
            'max_per_hour' => 'required|integer',
        ]);

        SmtpServer::create($validated);

        return back()->with('success', 'Serveur SMTP ajouté avec succès.');
    }

    public function update(Request $request, SmtpServer $smtpServer)
    {
        $validated = $request->validate([
            'host' => 'string',
            'port' => 'integer',
            'username' => 'string',
            'encryption' => 'nullable|string|in:tls,ssl,none',
            'priority' => 'integer',
            'max_per_hour' => 'integer',
            'active' => 'boolean',
        ]);

        if ($request->has('password') && !empty($request->password)) {
            $validated['password'] = $request->password;
        }

        $smtpServer->update($validated);

        return back()->with('success', 'Serveur SMTP mis à jour.');
    }

    public function destroy(SmtpServer $smtpServer)
    {
        $smtpServer->delete();
        return back()->with('success', 'Serveur SMTP supprimé.');
    }

    public function toggle(SmtpServer $smtpServer)
    {
        $smtpServer->update(['active' => !$smtpServer->active]);
        return back()->with('success', 'Statut du serveur SMTP modifié.');
    }
}

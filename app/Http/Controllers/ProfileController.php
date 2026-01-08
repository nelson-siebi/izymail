<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function settings(Request $request)
    {
        return Inertia::render('Settings', [
            'user' => $request->user()
        ]);
    }

    public function invoices(Request $request)
    {
        return Inertia::render('Invoices', [
            'invoices' => [] // Mock for now
        ]);
    }
}

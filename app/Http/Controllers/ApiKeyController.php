<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ApiKeyController extends Controller
{
    public function index(Request $request)
    {
        $tokens = $request->user()->tokens()
            ->latest()
            ->get();

        return Inertia::render('ApiKeys', [
            'tokens' => $tokens
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $tokenName = $request->name;
        $token = $request->user()->createToken($tokenName);

        return back()->with([
            'success' => 'Clé API générée avec succès.',
            'newToken' => $token->plainTextToken
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $request->user()->tokens()->where('id', $id)->delete();

        return back()->with('success', 'Clé API révoquée avec succès.');
    }
}

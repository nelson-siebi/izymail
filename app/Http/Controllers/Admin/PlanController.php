<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/PlanManager', [
            'plans' => Plan::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'max_mails_per_day' => 'required|integer|min:1',
            'max_attachment_size_mb' => 'required|integer|min:0',
            'sandbox_limit' => 'required|integer|min:0',
        ]);

        Plan::create($validated);

        return back()->with('success', 'Plan créé avec succès.');
    }

    public function update(Request $request, Plan $plan)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'price' => 'numeric|min:0',
            'max_mails_per_day' => 'integer|min:1',
            'max_attachment_size_mb' => 'integer|min:0',
            'sandbox_limit' => 'integer|min:0',
        ]);

        $plan->update($validated);

        return back()->with('success', 'Plan mis à jour.');
    }

    public function destroy(Plan $plan)
    {
        $plan->delete();
        return back()->with('success', 'Plan supprimé.');
    }
}

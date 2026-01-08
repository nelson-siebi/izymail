<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('plans');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return Inertia::render('Admin/UserManager', [
            'users' => $query->latest()->paginate(15)->withQueryString(),
            'plans' => Plan::all(),
            'filters' => $request->only(['search'])
        ]);
    }

    public function updatePlan(Request $request, User $user)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id'
        ]);

        // Deactivate old plans
        $user->plans()->updateExistingPivot($user->plans->pluck('id'), ['is_active' => false]);

        // Attach/Activate new plan
        if ($user->plans->contains($request->plan_id)) {
            $user->plans()->updateExistingPivot($request->plan_id, [
                'is_active' => true,
                'start_date' => now(),
                'end_date' => now()->addMonth(),
            ]);
        } else {
            $user->plans()->attach($request->plan_id, [
                'is_active' => true,
                'start_date' => now(),
                'end_date' => now()->addMonth(),
            ]);
        }

        return back()->with('success', "Plan de l'utilisateur mis à jour.");
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('success', 'Utilisateur supprimé avec succès.');
    }
}

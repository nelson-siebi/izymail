<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // Attach plan if exists
        if ($request->plan_id) {
            $plan = Plan::find($request->plan_id);
            if ($plan) {
                $user->plans()->attach($plan->id, [
                    'start_date' => now(),
                    'end_date' => now()->addMonth(),
                    'is_active' => true
                ]);
            }
        } else {
            // Default free plan
            $freePlan = Plan::where('price', 0)->first();
            if ($freePlan) {
                $user->plans()->attach($freePlan->id, [
                    'start_date' => now(),
                    'end_date' => now()->addYear(),
                    'is_active' => true
                ]);
            }
        }

        Auth::login($user);

        session()->flash('success', 'Bienvenue sur Izymail ! Votre compte a été créé.');

        return redirect(route('dashboard', absolute: false));
    }
}

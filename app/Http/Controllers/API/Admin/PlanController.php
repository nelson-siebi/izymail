<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(Plan::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'max_mails_per_day' => 'required|integer',
            'max_attachment_size_mb' => 'integer',
            'sandbox_limit' => 'nullable|integer',
        ]);

        $plan = Plan::create($validated);

        return response()->json($plan, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $plan = Plan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($plan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $plan = Plan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'string',
            'price' => 'numeric',
            'max_mails_per_day' => 'integer',
            'max_attachment_size_mb' => 'integer',
            'sandbox_limit' => 'nullable|integer',
        ]);

        $plan->update($validated);

        return response()->json($plan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $plan = Plan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $plan->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}

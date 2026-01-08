<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\SmtpServer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SmtpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(SmtpServer::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'host' => 'required|string',
            'port' => 'required|string',
            'username' => 'nullable|string',
            'password' => 'nullable|string',
            'encryption' => 'nullable|string',
            'priority' => 'integer',
            'max_per_hour' => 'integer',
            'active' => 'boolean',
        ]);

        $server = SmtpServer::create($validated);

        return response()->json($server, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $server = SmtpServer::find($id);
        if (!$server) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($server);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $server = SmtpServer::find($id);
        if (!$server) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $validated = $request->validate([
            'host' => 'string',
            'port' => 'string',
            'username' => 'nullable|string',
            'password' => 'nullable|string',
            'encryption' => 'nullable|string',
            'priority' => 'integer',
            'max_per_hour' => 'integer',
            'active' => 'boolean',
        ]);

        $server->update($validated);

        return response()->json($server);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $server = SmtpServer::find($id);
        if (!$server) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $server->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}

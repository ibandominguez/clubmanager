<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Member;

class MemberController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $members = Member::all();
        return response()->json($members, Response::HTTP_OK);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $member = Member::findOrFail($id);
        return response()->json($member, Response::HTTP_OK);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            // Add validation rules here
        ]);

        $member = Member::create($request->all());
        return response()->json($member, Response::HTTP_CREATED);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            // Add validation rules here
        ]);

        $member = Member::findOrFail($id);
        $member->update($request->all());
        return response()->json($member, Response::HTTP_OK);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $member = Member::findOrFail($id);
        $member->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}

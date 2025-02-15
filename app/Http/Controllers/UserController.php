<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class UserController extends Controller
{
  public function create(Request $request): JsonResponse {
    $request->validate([
      'name' => ['required'],
      'email' => ['required', 'email', 'unique:users,email'],
      'password' => [
        'required',
        'min:8',
        'confirmed',
      ],
    ]);

    $user = User::create($request->only(['name', 'email', 'password']));

    return response()->json($user, 201);
  }

  public function showMe(Request $request): JsonResponse {
    return response()->json($request->user(), 200);
  }
}

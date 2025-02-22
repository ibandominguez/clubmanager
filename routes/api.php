<?php

use App\Http\Controllers\MemberController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\UserController;

Route::post('/tokens', [TokenController::class, 'create']);

Route::post('/users', [UserController::class, 'create']);
Route::get('/users/me', [UserController::class, 'showMe'])->middleware('auth:sanctum');

Route::get('/members', [MemberController::class, 'index'])->middleware('auth:sanctum');
Route::get('/members/{id}', [MemberController::class, 'show'])->middleware('auth:sanctum');
Route::post('/members', [MemberController::class, 'store'])->middleware('auth:sanctum');
Route::put('/members/{id}', [MemberController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/members/{id}', [MemberController::class, 'destroy'])->middleware('auth:sanctum');



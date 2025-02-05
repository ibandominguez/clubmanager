<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\UserController;

Route::post('/tokens', [TokenController::class, 'create']);

Route::post('/users', [UserController::class, 'create']);
Route::get('/users/me', [UserController::class, 'showMe'])->middleware('auth:sanctum');

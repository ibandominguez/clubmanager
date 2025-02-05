<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_auth_login(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt($password = 'password123'),
        ]);

        $response = $this->postJson('/api/tokens', [
            'email' => $user->email,
            'password' => $password,
        ]);

        $response->assertStatus(201);

        $response->assertJsonStructure([
            'token',
        ]);
    }

    public function test_auth_login_with_incorrect_credentials(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/tokens', [
            'email' => $user->email,
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(422);

        $response->assertJsonStructure([
            'message',
        ]);
    }
}

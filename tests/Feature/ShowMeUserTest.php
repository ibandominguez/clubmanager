<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class ShowMeUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_show_me_user(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/users/me', [
            'Authorization' => 'Bearer ' . $user->createToken('spa')->plainTextToken,
        ]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'id',
            'name',
            'email',
            'created_at',
            'updated_at',
        ]);
    }
}


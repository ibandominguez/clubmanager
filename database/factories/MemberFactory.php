<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uid' => $this->faker->unique()->uuid,
            'name' => $this->faker->name,
            'photo_url' => $this->faker->imageUrl(640, 480, 'people'),
            'dob' => $this->faker->date('Y-m-d', '2000-01-01'),
            'dni_nie' => $this->faker->unique()->regexify('[A-Z]{1}[0-9]{7}[A-Z]{1}'),
            'address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'registered_at' => $this->faker->dateTimeBetween('-5 years', 'now'),
            'is_retired' => $this->faker->boolean,
        ];
    }
}

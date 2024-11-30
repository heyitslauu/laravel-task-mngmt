<?php

namespace Database\Factories;

use App\Models\Task;
use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence,
            'description' => fake()->paragraph,
            'status' => $this->faker->randomElement(TaskStatus::cases())->value, // Use enum cases
        ];
    }
}

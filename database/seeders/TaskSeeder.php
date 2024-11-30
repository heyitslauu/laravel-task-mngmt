<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Task Seeder

        Task::factory()
            ->count(25)
            ->create();
    }
}

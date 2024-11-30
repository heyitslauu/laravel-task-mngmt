<?php

it('can create a task', function () {
    $task = \App\Models\Task::factory()->create();

    // Check if task is in the database
    expect($task)->toBeInstanceOf(\App\Models\Task::class);
    expect($task->title)->not()->toBeEmpty();
});

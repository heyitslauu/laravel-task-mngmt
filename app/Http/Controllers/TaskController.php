<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\TaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch tasks and paginate them (if needed)
        $tasks = Task::orderBy('created_at', 'desc')->paginate(10);

        // Return to Inertia with tasks data
        return Inertia::render('Task/Index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $request)
    {
        // Create the new task
        $task = Task::create($request->validated());

        // Fetch the tasks, sorted by 'created_at' in descending order and paginate them
        $tasks = Task::orderBy('created_at', 'desc')->paginate(10);

        // Return the updated tasks list to the Inertia response
        return Inertia::render('Task/Index', [
            'tasks' => $tasks,
        ]);
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

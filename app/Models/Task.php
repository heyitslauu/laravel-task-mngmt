<?php

namespace App\Models;

use App\Enums\TaskStatus;
use App\Enums\Priority;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    //
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'description', 'status', 'priority'];

    protected $casts = [
        'status' => TaskStatus::class, // Cast the `status` field to the TaskStatus enum,
        'priority' => Priority::class, // Cast the `status` field to the TaskStatus enum,
    ];
}

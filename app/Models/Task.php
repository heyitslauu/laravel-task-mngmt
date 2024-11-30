<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\TaskStatus;

class Task extends Model
{
    //
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'description', 'status'];

    protected $casts = [
        'status' => TaskStatus::class, // Cast the `status` field to the TaskStatus enum
    ];
}

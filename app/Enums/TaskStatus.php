<?php

namespace App\Enums;

enum TaskStatus: string
{
    case TODO = 'todo';
    case COMPLETED = 'completed';
    case STALE = 'stale';
    case ONGOING = 'ongoing';
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $primaryKey = 'course_id';

    // Ha nincs timestamps oszlopod (created_at, updated_at), akkor:
    public $timestamps = false;
}

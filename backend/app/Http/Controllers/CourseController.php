<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\JsonResponse;

class CourseController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Course::select('course_id as id', 'course_name as name')->orderBy('course_name')->get()
        );
    }
}

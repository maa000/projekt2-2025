<?php

namespace App\Http\Controllers;

use App\Models\Measurement;
use Illuminate\Http\JsonResponse;

class MeasurementController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Measurement::select('measurement_id as id', 'measurement_name as name')->orderBy('measurement_name')->get()
        );
    }
}

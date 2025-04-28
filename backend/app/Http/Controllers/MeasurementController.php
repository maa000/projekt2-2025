<?php

namespace App\Http\Controllers;

use App\Models\Measurement;
use Illuminate\Http\JsonResponse;

class MeasurementController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Measurement::select('name')->orderBy('name')->get());
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class EmailChangeController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);

        $user = Auth::user();
        $user->email = $request->email;
        $user->save();

        return response()->json(['message' => 'E-mail cím sikeresen frissítve.']);
    }
}


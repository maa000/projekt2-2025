<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function destroy(Request $request)
    {
        $user = $request->user();

        // Opcionális: töröld a felhasználó receptjeit, kommentjeit stb.

        $user->delete();

        return response()->json(['message' => 'Felhasználó törölve.']);
    }
}

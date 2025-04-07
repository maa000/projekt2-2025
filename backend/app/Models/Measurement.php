<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    protected $table = 'measurements';
    protected $primaryKey = 'measurement_id';
    public $timestamps = false;

    protected $fillable = [
        'measurement_name',
    ];
}

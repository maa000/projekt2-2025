<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'images';
    protected $primaryKey = 'image_id';

    protected $fillable = [
        'recipe_id',
        'image_url',
        'upload_date',
    ];

    public $timestamps = false; // Mivel van saját `upload_date` meződ

    public function recipe()
    {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }
}


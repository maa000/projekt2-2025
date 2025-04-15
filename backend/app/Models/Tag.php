<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tags';
    protected $primaryKey = 'tag_id';
    public $timestamps = false;

    protected $fillable = [
        'tag_name',
    ];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_tags', 'tag_id', 'recipe_id');
    }
}

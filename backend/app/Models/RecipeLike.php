<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeLike extends Model
{
    protected $table = 'recipe_likes'; // ha más lenne a tábla neve

    protected $primaryKey = 'like_id'; // nem az id, hanem like_id a primary key

    public $timestamps = false; // nincs created_at, updated_at automatikusan

    protected $fillable = [
        'user_id',
        'recipe_id',
        'like_date',
    ];
    public function recipe()
    {
        return $this->hasMany(Recipe::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StyleTagCategorie extends Model
{
    protected $table ='styleTagCategorie';
    protected $primaryKey = 'ID';

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function styleTag()
    {
        return $this->hasMany('App\Models\StyleTag', 'styleTagCategorieID', 'ID');
    }
}

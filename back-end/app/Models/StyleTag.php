<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StyleTag extends Model
{
    protected $table = 'styleTag';
    protected $primaryKey = 'ID';

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function beerstyle()
    {
        return $this->hasMany('App\Models\Beerstyle', 'styleTagID', 'ID');
    }

    public function styleTagCategorie()
    {
        return $this->belongsTo('App\Models\StyleTagCategorie', 'styleTagCategorieID', 'ID');
    }
}

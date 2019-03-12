<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StyleTagCategory extends Model
{
    protected $table ='styleTagCategory';
    protected $primaryKey = 'ID';

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function styleTag()
    {
        return $this->hasMany('App\Models\StyleTag', 'styleTagCategoryID', 'ID');
    }
}

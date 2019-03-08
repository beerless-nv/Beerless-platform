<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beerstyle extends Model
{
    protected $table = "beerstyle";
    protected $primaryKey = "ID";

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function beers()
    {
        return $this->belongsTo('App\Models\Beer');
    }

    public function styleTag()
    {
        return $this->belongsTo('App\Models\StyleTag');
    }
}

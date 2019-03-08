<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BeerFromBrewery extends Model
{
    protected $table ='beerFromBrewery';
    protected $primaryKey = 'ID';

    protected $attributes = [
        'isPublisher' => false
    ];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function beer()
    {
        return $this->belongsTo('App\Models\Beer', 'beerID', 'ID');
    }

    public function brewery()
    {
        return $this->belongsTo('App\Models\Brewery', 'breweryID', 'ID');
    }
}

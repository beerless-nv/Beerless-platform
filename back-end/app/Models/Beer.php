<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beer extends Model
{
    protected $table ='beer';
    protected $primaryKey = 'ID';

    protected $attributes = [        
        'ABV' => 0,
        'IBU' => 0,
        'EBC' => 0,
        'temperature' => 0,
        'since' => 0
    ];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function beerFromBrewery()
    {
        return $this->hasMany('App\Models\BeerFromBrewery', 'beerID', 'ID');
    }


    //
    //
    // VERANDEREN NAAR BEERSTYLE !!!!
    //
    //

    public function beertype()
    {
        return $this->belongsTo('App\Models\Beerstyle', 'beertypeID', 'ID');
    }

    public function user()
    {
        return $this->hasMany('App\Models\User', 'favouriteBeerID', 'ID');
    }

    public function activity()
    {
        return $this->hasMany('App\Models\Activity', 'beerID', 'ID');
    }

    public function tastingprofile()
    {
        return $this->hasMany('App\Models\Tastingprofile', 'beerID', 'ID');
    }
}

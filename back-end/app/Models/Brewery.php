<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brewery extends Model
{
    protected $table = "brewery";
    protected $primaryKey = "ID";

    protected $attributes = [
        'description' => null,
        'country' => null,
        'place' => null,
        'postcode' => null,
        'streetAndNumber' => null,
        'logo' => null,
        'province' => null,
        'beerAmount' => 0,
    ];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function beersFromBrewery()
    {
        return $this->hasMany('App\Models\BeersFromBrewery', 'breweryID', 'ID');
    }

    public function contact()
    {
        return $this->hasOne('App\Models\Contact', 'breweryID', 'ID');
    }

    public function activity()
    {
        return $this->hasMany('App\Models\Activity', 'breweryID', 'ID');
    }
}

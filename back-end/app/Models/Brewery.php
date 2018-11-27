<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brewery extends Model
{
    // Default values
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

    // Which values are allowed to be assigned through mass assignment
    protected $fillable = [
        'description',
        'country',
        'place',
        'postcode',
        'streetAndNumber',
        'logo',
        'province',
        'beerAmount',
        'contactID'
    ];
    protected $dates = [];
    protected $table = "Brewery";
    protected $primaryKey = "ID";
    public $timestamps = false;

    public static $rules = [
        // Validation rules
    ];

    // Relationships
    public function beers()
    {
        return $this->hasMany('App\Models\Beer');
    }

    public function contact()
    {
        return $this->hasOne('App\Models\Contact');
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beertype extends Model
{

    protected $attributes = [
        'description' => '',
    ];
    protected $fillable = [
        'name',
        'description',
    ];
    protected $dates = [];
    protected $table ='Beertype';
    protected $primaryKey = 'ID';
    public $timestamps = false;
    // const CREATED_AT = 'timestampCreated';
    // const UPDATED_AT = 'timestampUpdate';

    public static $rules = [
        // Validation rules
    ];

    // Relationships
    public function beers()
    {
        return $this->hasMany('App\Models\Beer');
    }
}

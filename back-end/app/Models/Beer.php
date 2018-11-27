<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beer extends Model
{
    protected $attributes = [
        
        'logo' => ''
    ];
    protected $fillable = [
        'name',
        'ABV',
        'IBU',
        'EBC',
        'temperature',
        'fermentation',
        'glass',
        'picture',
        'logo',
        'description',
        'season',
        'since',
        'breweryID',
        'beertypeID'
    ];
    protected $dates = [];
    protected $table ='Beer';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdate';

    // Relationships
    public function brewery()
    {
        return $this->belongsTo('App\Models\Brewery', 'breweryID', 'ID');
    }

    public function beertype()
    {
        return $this->belongsTo('App\Models\Beertype', 'beertypeID', 'ID');
    }
}
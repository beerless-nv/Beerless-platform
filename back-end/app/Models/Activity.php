<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $attributes = [ ];
    protected $fillable = [
        'activityTypeID',
        'userID',
        'articleID',
        'beerID',
        'breweryID'
    ];
    protected $dates = [];
    protected $table ='Activity';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function activitytype()
    {
        return $this->belongsTo('App\Models\ActivityType', 'activityTypeID', 'ID');
    }

    public function article()
    {
        return $this->belongsTo('App\Models\Article', 'articleID', 'ID');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'userID', 'ID');
    }

    public function brewery()
    {
        return $this->belongsTo('App\Models\Brewery', 'breweryID', 'ID');
    }

    public function beer()
    {
        return $this->belongsTo('App\Models\Beer', 'beerID', 'ID');
    }
}

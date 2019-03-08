<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tastingprofile extends Model
{
    protected $table = 'tastingprofile';
    protected $primaryKey = 'ID';

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function beer()
    {
        return $this->belongsTo('App\Models\Beer', 'beerID', 'ID');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'userID', 'ID');
    }
}

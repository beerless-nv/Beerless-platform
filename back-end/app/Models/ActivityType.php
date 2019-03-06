<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityType extends Model
{
    protected $attributes = [
        'name' => '',
        'points' => ''
    ];
    protected $fillable = [ ];
    protected $dates = [];
    protected $table ='activityType';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function activity()
    {
        return $this->hasMany('App\Models\Activity', 'activityTypeID', 'ID');
    }
}

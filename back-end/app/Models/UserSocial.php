<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSocial extends Model
{
    protected $table ='userSocial';
    protected $primaryKey = 'ID';

    protected $attributes = [];
    protected $fillable = [
        'socialPlatform'
    ];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'userID', 'ID');
    }
}

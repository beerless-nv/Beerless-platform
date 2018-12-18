<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSocial extends Model
{
    protected $attributes = [
    ];
    protected $fillable = [
        'userID',
        'socialID',
        'socialPlatform',
        'picture',
    ];
    protected $dates = [];
    protected $table ='UserSocial';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'userID', 'ID');
    }
}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    protected $table = 'userRole';
    protected $primaryKey = 'ID';

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function role()
    {
        return $this->belongsTo('App\Models\Role', 'roleID', 'ID');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'userID', 'ID');
    }
}

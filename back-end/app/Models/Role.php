<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = "role";
    protected $primaryKey = "ID";

    protected $attributes = [
        'description' => null
    ];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function roleTablePermission()
    {
        return $this->hasMany('App\Models\RoleTablePermission', 'roleID', 'ID');
    }

    public function userRole()
    {
        return $this->hasMany('App\Models\UserRole', 'roleID', 'ID');
    }
}

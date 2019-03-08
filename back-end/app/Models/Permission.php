<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $table = "permission";
    protected $primaryKey = "ID";

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function roleTablePermission()
    {
        return $this->hasOne('App\Models\RoleTablePermission', 'permissionID', 'ID');
    }
}

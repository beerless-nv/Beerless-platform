<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleTablePermission extends Model
{
    protected $table = "roleTablePermission";
    protected $primaryKey = "ID";

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function permission()
    {
        return $this->belongsTo('App\Models\Permission', 'permissionID', 'ID');
    }

    public function role()
    {
        return $this->belongsTo('App\Models\Role', 'roleID', 'ID');
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $table ='status';
    protected $primaryKey = 'ID';

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function relationship()
    {
        return $this->hasMany('App\Models\Relationship', 'statusID', 'ID');
    }
}

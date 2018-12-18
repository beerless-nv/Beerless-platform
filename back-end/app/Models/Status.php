<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $attributes = [ ];
    protected $fillable = [
        'name'
    ];
    protected $dates = [];
    protected $table ='Status';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function relationship()
    {
        return $this->hasMany('App\Models\Relationship', 'statusID', 'ID');
    }
}

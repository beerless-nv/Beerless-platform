<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    protected $table ='relationship';
    protected $primaryKey = 'ID';

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function user_1()
    {
        return $this->belongsTo('App\Models\User', 'user_1ID', 'ID');
    }

    public function user_2()
    {
        return $this->belongsTo('App\Models\User', 'user_2ID', 'ID');
    }

    public function actionUser()
    {
        return $this->belongsTo('App\Models\User', 'actionUserID', 'ID');
    }

    public function status()
    {
        return $this->belongsTo('App\Models\Status', 'statusID', 'ID');
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    protected $attributes = [
        'status' => ''
    ];
    protected $fillable = [
        'status',
        'user_1_ID',
        'user_2_ID',
        'actionUserID',
        'statusID'
    ];
    protected $dates = [];
    protected $table ='Relationship';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function user_1()
    {
        return $this->belongsTo('App\Models\User', 'user_1_ID', 'ID');
    }

    public function user_2()
    {
        return $this->belongsTo('App\Models\User', 'user_2_ID', 'ID');
    }

    public function actionuser()
    {
        return $this->belongsTo('App\Models\User', 'actionUserID', 'ID');
    }

    public function status()
    {
        return $this->belongsTo('App\Models\Status', 'statusID', 'ID');
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $attributes = [
        'username' => '',
        'password' => '',
        'firstName' => '',
        'lastName' => '',
        'picture' => '',
        'bio' => '',
        'country' => '',
        'province' => '',
        'place' => '',
        'favouriteBeerID' => 0,
        'totalPoints' => 0
    ];
    protected $fillable = [
        'username',
        'email',
        'password',
        'firstName',
        'lastName',
        'picture',
        'bio',
        'country',
        'province',
        'place',
        'totalPoints',
        'favouriteBeerID'
    ];
    protected $dates = [];
    protected $hidden = ['password'];
    protected $table ='user';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    

    public static $rules = [
        // Validation rules
    ];

    // Relationships
    public function article()
    {
        return $this->hasMany('App\Models\UserSocial', 'userID', 'ID');
    }

    public function usersocial()
    {
        return $this->hasMany('App\Models\UserSocial', 'userID', 'ID');
    }

    public function activity()
    {
        return $this->hasmany('App\Models\Activity', 'userID', 'ID');
    }

    public function user_1()
    {
        return $this->hasmany('App\Models\Activity', 'user_1_ID', 'ID');
    }

    public function user_2()
    {
        return $this->hasmany('App\Models\Activity', 'user_2_ID', 'ID');
    }

    public function actionuser()
    {
        return $this->hasmany('App\Models\Activity', 'actionUserID', 'ID');
    }

    public function favouritebeer()
    {
        return $this->belongsTo('App\Models\Beer', 'favouriteBeerID', 'ID');
    }
}

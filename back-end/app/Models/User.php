<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table ='user';
    protected $primaryKey = 'ID';

    protected $attributes = [
        'username' => null,
        'password' => null,
        'firstName' => null,
        'lastName' => null,
        'email' => null,
        'picture' => null,
        'bio' => null,
        'country' => null,
        'province' => null,
        'place' => null,
        'favouriteBeerID' => 0,
        'totalPoints' => 0
    ];
    protected $fillable = [];
    protected $dates = [];
    protected $hidden = ['password'];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function article()
    {
        return $this->hasMany('App\Models\Article', 'userID', 'ID');
    }

    public function userSocial()
    {
        return $this->hasMany('App\Models\UserSocial', 'userID', 'ID');
    }

    public function activity()
    {
        return $this->hasMany('App\Models\Activity', 'userID', 'ID');
    }

    public function user_1()
    {
        return $this->hasMany('App\Models\Relationship', 'user_1_ID', 'ID');
    }

    public function user_2()
    {
        return $this->hasMany('App\Models\Relationship', 'user_2_ID', 'ID');
    }

    public function actionUser()
    {
        return $this->hasMany('App\Models\Relationship', 'actionUserID', 'ID');
    }

    public function favouriteBeer()
    {
        return $this->belongsTo('App\Models\Beer', 'favouriteBeerID', 'ID');
    }

    public function tastingprofile() {
        return $this->hasMany('App\Models\TastingProfile', 'beerID', 'ID');
    }

    public function userRole() {
        return $this->hasMany('App\Models\UserRole', 'userID', 'ID');
    }
}

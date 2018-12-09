<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $attributes = [
        'username' => '',
        'password' => '',
        'firstname' => '',
        'lastname' => '',
        'picture' => '',
        'bio' => '',
        'country' => '',
        'province' => '',
        'place' => '',
    ];
    protected $fillable = [
        'username',
        'email',
        'password',
        'firstname',
        'lastname',
        'picture',
        'bio',
        'country',
        'province',
        'place'
    ];
    protected $dates = [];
    protected $hidden = ['password'];
    protected $table ='User';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    

    public static $rules = [
        // Validation rules
    ];

    // Relationships
    public function usersocial()
    {
        return $this->hasMany('App\Models\UserSocial', 'userID', 'ID');
    }
}

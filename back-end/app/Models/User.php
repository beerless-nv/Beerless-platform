<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $attributes = [
        'firstname' => '',
        'lastname' => '',
        'profilepicture' => '',
        'bio' => '',
        'country' => '',
        'province' => '',
        'place' => ''
    ];
    protected $fillable = [
        'username',
        'email',
        'password',
        'firstname',
        'lastname',
        'profilepicture',
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
    const UPDATED_AT = 'timestampUpdate';

    public static $rules = [
        // Validation rules
    ];

    // Relationships
}

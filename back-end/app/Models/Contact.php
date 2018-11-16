<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    // Default values
    protected $attributes = [
        'website' => '',
        'twitter' => '',
        'facebook' => '',
        'instagram' => '',
    ];

    // Which values are allowed to be assigned through mass assignment
    protected $fillable = [
        'website',
        'twitter',
        'facebook',
        'instagram',
    ];
    protected $dates = [];
    protected $table = "Contact";
    protected $primaryKey = "ID";
    public $timestamps = false;


    public static $rules = [
        // Validation rules
    ];

    // Relationships
    public function brewery()
    {
        return $this->hasOne('App\Models\Brewery', 'ContactID');
    }
}

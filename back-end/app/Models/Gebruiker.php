<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gebruiker extends Model
{
    protected $attributes = [
        'voornaam' => '',
        'achternaam' => '',
        'profielfoto' => '',
        'bio' => '',
        'land' => '',
        'provincie' => '',
        'plaats' => ''
    ];
    protected $fillable = [
        'gebruikersnaam',
        'email',
        'wachtwoord',
        'voornaam',
        'achternaam',
        'profielfoto',
        'bio',
        'land',
        'provincie',
        'plaats'
    ];
    protected $dates = [];
    protected $hidden = ['wachtwoord'];
    protected $table ='Gebruiker';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    public static $rules = [
        // Validation rules
    ];

    // Relationships
}

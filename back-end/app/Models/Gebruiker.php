<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gebruiker extends Model {

    protected $fillable = [];
    protected $dates = [];
    protected $table = "Gebruiker";
    protected $primaryKey = "ID";
    public $timestamps = false;

    public static $rules = [
        // Validation rules
    ];

    // Relationships

}

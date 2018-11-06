<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model {

    protected $fillable = [];
    protected $dates = [];
    protected $table = "Contact";
    protected $primaryKey = "ID";
    public $timestamps = false;


    public static $rules = [
        // Validation rules
    ];

    // Relationships
    public function brouwerij(){
        return $this->hasOne('App\Models\Brouwerij', 'contactID');
    }
}

<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brouwerij extends Model {

    protected $fillable = [];
    protected $dates = [];
    protected $table = "Brouwerij";
    protected $primaryKey = "ID";
    public $timestamps = false;

    public static $rules = [
        // Validation rules
    ];

    // Relationships
    public function bieren(){
        return $this->hasMany('App\Models\Bier');
    }

    public function contact(){
        return $this->hasOne('App\Models\Contact');
    }

}

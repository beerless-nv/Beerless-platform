<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Biersoort extends Model {

    protected $fillable = [];
    protected $dates = [];
    protected $table = "Biersoort";
    protected $primaryKey = "ID";
    public $timestamps = false;

    public static $rules = [
        // Validation rules
    ];

    // Relationships
    public function bieren(){
        return $this->hasMany('App\Models\Bier');
    }
}

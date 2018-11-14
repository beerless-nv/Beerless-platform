<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bier extends Model
{

    protected $fillable = [];
    protected $dates = [];
    protected $table = "Bier";
    protected $primaryKey = "ID";
    public $timestamps = false;

    public static $rules = [
        // Validation rules
    ];

    // Relationships
    public function brouwerij()
    {
        return $this->belongsTo('App\Models\Brouwerij', 'brouwerijID', 'ID');
    }

    public function biersoort()
    {
        return $this->belongsTo('App\Models\Biersoort', 'biersoortID', 'ID');
    }
}

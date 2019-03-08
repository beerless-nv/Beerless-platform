<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = "contact";
    protected $primaryKey = "ID";

    protected $attributes = [
        'website' => null,
        'twitter' => null,
        'facebook' => null,
        'instagram' => null,
    ];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function brewery()
    {
        return $this->hasOne('App\Models\Brewery', 'contactID', 'ID');
    }
}

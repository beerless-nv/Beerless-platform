<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $attributes = [
        
    ];
    protected $fillable = [
        'name'
    ];
    protected $dates = [];
    protected $table ='tag';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'userID', 'ID');
    }

    public function articletag()
    {
        return $this->hasMany('App\Models\ArticleTag', 'articleID', 'ID');
    }
}

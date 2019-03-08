<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table ='article';
    protected $primaryKey = 'ID';

    protected $attributes = [];
    protected $fillable = [];
    protected $dates = [];

    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'userID', 'ID');
    }

    public function articleTag()
    {
        return $this->hasMany('App\Models\ArticleTag', 'articleID', 'ID');
    }

    public function activity()
    {
        return $this->hasMany('App\Models\Activity', 'articleID', 'ID');
    }
}

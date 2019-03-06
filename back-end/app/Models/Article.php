<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $attributes = [
        'slug' => '',
        'picture' => '',
        'intro' =>'',
        'content' => ''
    ];
    protected $fillable = [
        'title',
        'slug',
        'content',
        'picture',
        'intro',
        'userID',
    ];
    protected $dates = [];
    protected $table ='article';
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

    public function activity()
    {
        return $this->hasMany('App\Models\Activity', 'articleID', 'ID');
    }
}

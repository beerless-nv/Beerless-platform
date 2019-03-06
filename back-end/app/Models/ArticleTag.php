<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleTag extends Model
{
    protected $attributes = [
        
    ];
    protected $fillable = [
        'articleID',
        'tagID'
    ];
    protected $dates = [];
    protected $table ='articleTag';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'timestampCreated';
    const UPDATED_AT = 'timestampUpdated';

    // Relationships
    public function article()
    {
        return $this->belongsTo('App\Models\Article', 'articleID', 'ID');
    }

    public function tag()
    {
        return $this->belongsTo('App\Models\Tag', 'tagID', 'ID');
    }
}

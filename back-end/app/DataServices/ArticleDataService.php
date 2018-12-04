<?php

namespace App\DataServices;

use App\Models\Article;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ArticleDataService
{
    /**
     * Undocumented function
     *
     * @return Article[]
     */
    public static function getAll($joinTables, $sortOrder){
        $query = Article::query();
        \joinTables($query, 'article', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Article
     */
    public static function insert(array $inputArray){       
        $article = new Article();
        foreach ($inputArray as $key => $value){
            $article[$key] = $value;
        }
        $article->save();
        return $article;
    }

    /**
     * Undocumented function
     *
     * @param integer $articleId
     * @return Article
     */
    public static function get(int $articleId, $joinTables){
        $query = Article::query();
        \joinTables($query, 'beertype', $articleId);
        return $query->findOrFail($articleId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Article[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder){
        $query = Article::query();
        \joinTables($query, 'beertype', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $value){
            if($value['propName'] == 'title'){
                $query->whereRaw('LOWER(name) like ?', ['%' . strtolower($value['value']) . '%']);
            } else{
                $query->where($value['propName'], $value['operator'], $value['value']);
            }
        }
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param integer $articleId
     * @return void
     */
    public static function delete(int $articleId){
        if(Article::where('id', $articleId)->exists()){
            Article::destroy($articleId);
        } else{
            throw new ModelNotFoundException();
        }
        
    }

    /**
     * Undocumented function
     *
     * @param integer $articleId
     * @param array $updateArray
     * @return Article
     */
    public static function update(int $articleId ,array $updateArray){
        $beer = Article::findOrFail($articleId);
        foreach ($updateArray as $key => $value){
            $beer[$key] = $value;
        }

        $beer->save();
        return $beer;
    }
}
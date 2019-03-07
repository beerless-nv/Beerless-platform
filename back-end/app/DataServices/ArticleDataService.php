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
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value){
        $query = Article::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'article', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $articleId
     * @return Article
     */
    public static function get(int $articleId, $joinTables, $value){
        $query = Article::query();
        \joinTables($query, 'article', $joinTables);
        return $query->findOrFail($articleId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Article[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value){
        $query = Article::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'article', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $param){
            if($param['propName'] == 'title'){
                $query->whereRaw('LOWER(title) like ?', ['%' . strtolower($param['value']) . '%']);
            } if($param['propName'] == 'slug') {
                $query->whereRaw('LOWER(slug) like ?', ['%' . strtolower($param['value']) . '%']);
            }else{
                $query->where($param['propName'], $param['operator'], $param['value']);
            }
        }

        if ($searchParams[0]['value'] == '') {
            return [];
        } else {
            return $query->get($value);
        }
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
     * @param array $updateArray
     * @return Article
     */
    public static function update(int $articleId ,array $updateArray){
        $article = Article::findOrFail($articleId);
        foreach ($updateArray as $key => $value){
            $article[$key] = $value;
        }

        $article->save();
        return $article;
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
}

<?php

namespace App\DataServices;

use App\Models\ArticleTag;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ArticleTagDataService
{
    /**
     * Undocumented function
     *
     * @return ArticleTag[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = ArticleTag::with('article.user', 'tag');
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'articletag', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $articletagId
     * @return ArticleTag
     */
    public static function get(int $articletagId, $joinTables, $value)
    {
        $query = ArticleTag::query();
        \joinTables($query, 'articletag', $joinTables);
        return $query->findOrFail($articletagId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return ArticleTag[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {        
        $query = ArticleTag::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'articletag', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $param){
            $query->where($param['propName'], $param['operator'], $param['value']);
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
     * @return ArticleTag
     */
    public static function insert(array $inputArray)
    {
        $articletag = new ArticleTag();
        foreach ($inputArray as $key => $value){
            $articletag[$key] = $value;
        }
        $articletag->save();
        return $articletag;
    }

    /**
     * Undocumented function
     *
     * @param integer $articletagId
     * @param array $updateArray
     * @return ArticleTag
     */
    public static function update(int $articletagId ,array $updateArray)
    {
        $articletag = ArticleTag::findOrFail($articletagId);
        foreach ($updateArray as $key => $value){
            $articletag[$key] = $value;
        }

        $articletag->save();
        return $articletag;
    }

    /**
     * Undocumented function
     *
     * @param integer $articletagId
     * @return void
     */
    public static function delete(int $articletagId)
    {
        if(ArticleTag::where('id', $articletagId)->exists()){
            ArticleTag::destroy($articletagId);
        } else{
            throw new ModelNotFoundException();
        }        
    }
}

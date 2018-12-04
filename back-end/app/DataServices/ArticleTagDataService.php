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
    public static function getAll($joinTables, $sortOrder)
    {
        $query = ArticleTag::query();
        \joinTables($query, 'articletag', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
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
     * @return ArticleTag
     */
    public static function get(int $articletagId, $joinTables)
    {
        $query = ArticleTag::query();
        \joinTables($query, 'articletag', $joinTables);
        return $query->findOrFail($articletagId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return ArticleTag[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder)
    {        
        $query = ArticleTag::query();
        \joinTables($query, 'articletag', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $value){
            if($value['propName'] == 'name'){
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
}
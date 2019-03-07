<?php

namespace App\DataServices;

use App\Models\Tag;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class TagDataService
{
    /**
     * Undocumented function
     *
     * @return Tag[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value){
        $query = Tag::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'tag', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $tagId
     * @return Tag
     */
    public static function get(int $tagId, $joinTables, $value){
        $query = Tag::query();
        \joinTables($query, 'tag', $joinTables);
        return $query->findOrFail($tagId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Tag[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value){
        $query = Tag::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'tag', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $param){
            if($param['propName'] == 'name'){
                $query->whereRaw('LOWER(name) like ?', ['%' . strtolower($param['value']) . '%']);
            } else{
                $query->where($param['propName'], $param['operator'], $param['value']);
            }
        }

        if ($searchParams[0]['value'] == '') {
            return '';
        } else {
            return $query->get($value);
        }
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Tag
     */
    public static function insert(array $inputArray){
        $tag = new Tag();
        foreach ($inputArray as $key => $value){
            $tag[$key] = $value;
        }
        $tag->save();
        return $tag;
    }

    /**
     * Undocumented function
     *
     * @param integer $tagId
     * @param array $updateArray
     * @return Tag
     */
    public static function update(int $tagId ,array $updateArray){
        $beer = Tag::findOrFail($tagId);
        foreach ($updateArray as $key => $value){
            $beer[$key] = $value;
        }

        $beer->save();
        return $beer;
    }

    /**
     * Undocumented function
     *
     * @param integer $tagId
     * @return void
     */
    public static function delete(int $tagId){
        if(Tag::where('id', $tagId)->exists()){
            Tag::destroy($tagId);
        } else{
            throw new ModelNotFoundException();
        }
        
    }
}

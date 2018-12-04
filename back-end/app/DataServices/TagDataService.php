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
    public static function getAll($joinTables, $sortOrder){
        $query = Tag::query();
        \joinTables($query, 'tag', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
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
     * @return Tag
     */
    public static function get(int $tagId, $joinTables){
        $query = Tag::query();
        \joinTables($query, 'tag', $tagId);
        return $query->findOrFail($tagId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Tag[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder){
        $query = Tag::query();
        \joinTables($query, 'tag', $joinTables);
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
}
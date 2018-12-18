<?php

namespace App\DataServices;

use App\Models\Relationship;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class RelationshipDataService
{
    /**
     * Undocumented function
     *
     * @return Relationship[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset){
        $query = Relationship::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'relationship', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Relationship
     */
    public static function insert(array $inputArray){       
        $relationship = new Relationship();
        foreach ($inputArray as $key => $value){
            $relationship[$key] = $value;
        }
        $relationship->save();
        return $relationship;
    }

    /**
     * Undocumented function
     *
     * @param integer $relationshipId
     * @return Relationship
     */
    public static function get(int $relationshipId, $joinTables){
        $query = Relationship::query();
        \joinTables($query, 'relationship', $relationshipId);
        return $query->findOrFail($relationshipId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Relationship[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset){
        $query = Relationship::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'relationship', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $value){
            $query->where($value['propName'], $value['operator'], $value['value']);
        }
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param integer $relationshipId
     * @return void
     */
    public static function delete(int $relationshipId){
        if(Relationship::where('id', $relationshipId)->exists()){
            Relationship::destroy($relationshipId);
        } else{
            throw new ModelNotFoundException();
        }
        
    }

    /**
     * Undocumented function
     *
     * @param integer $relationshipId
     * @param array $updateArray
     * @return Relationship
     */
    public static function update(int $relationshipId ,array $updateArray){
        $relationship = Relationship::findOrFail($relationshipId);
        foreach ($updateArray as $key => $value){
            $relationship[$key] = $value;
        }

        $relationship->save();
        return $relationship;
    }
}
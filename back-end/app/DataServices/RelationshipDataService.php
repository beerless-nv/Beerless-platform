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
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value){
        $query = Relationship::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'relationship', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $relationshipId
     * @return Relationship
     */
    public static function get(int $relationshipId, $joinTables, $value){
        $query = Relationship::query();
        \joinTables($query, 'relationship', $joinTables);
        return $query->findOrFail($relationshipId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Relationship[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value){
        $query = Relationship::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'relationship', $joinTables);
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
}

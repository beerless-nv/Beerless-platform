<?php

namespace App\DataServices;

use App\Models\ActivityType;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ActivityTypeDataService
{
    /**
     * Undocumented function
     *
     * @return ActivityType[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset){
        $query = ActivityType::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'activitytype', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return ActivityType
     */
    public static function insert(array $inputArray){       
        $activitytype = new ActivityType();
        foreach ($inputArray as $key => $value){
            $activitytype[$key] = $value;
        }
        $activitytype->save();
        return $activitytype;
    }

    /**
     * Undocumented function
     *
     * @param integer $activitytypeId
     * @return ActivityType
     */
    public static function get(int $activitytypeId, $joinTables){
        $query = ActivityType::query();
        \joinTables($query, 'activitytype', $activitytypeId);
        return $query->findOrFail($activitytypeId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return ActivityType[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset){
        $query = ActivityType::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'activitytype', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $value){
            $query->where($value['propName'], $value['operator'], $value['value']);
        }
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param integer $activitytypeId
     * @return void
     */
    public static function delete(int $activitytypeId){
        if(ActivityType::where('id', $activitytypeId)->exists()){
            ActivityType::destroy($activitytypeId);
        } else{
            throw new ModelNotFoundException();
        }
        
    }

    /**
     * Undocumented function
     *
     * @param integer $activitytypeId
     * @param array $updateArray
     * @return ActivityType
     */
    public static function update(int $activitytypeId ,array $updateArray){
        $activitytype = ActivityType::findOrFail($activitytypeId);
        foreach ($updateArray as $key => $value){
            $activitytype[$key] = $value;
        }

        $activitytype->save();
        return $activitytype;
    }
}
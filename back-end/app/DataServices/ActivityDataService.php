<?php

namespace App\DataServices;

use App\Models\Activity;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ActivityDataService
{
    /**
     * Undocumented function
     *
     * @return Activity[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset){
        $query = Activity::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'activity', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Activity
     */
    public static function insert(array $inputArray){       
        $activity = new Activity();
        foreach ($inputArray as $key => $value){
            $activity[$key] = $value;
        }
        $activity->save();
        return $activity;
    }

    /**
     * Undocumented function
     *
     * @param integer $activityId
     * @return Activity
     */
    public static function get(int $activityId, $joinTables){
        $query = Activity::query();
        \joinTables($query, 'activity', $activityId);
        return $query->findOrFail($activityId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Activity[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset){
        $query = Activity::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'activity', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $value){
            $query->where($value['propName'], $value['operator'], $value['value']);
        }
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param integer $activityId
     * @return void
     */
    public static function delete(int $activityId){
        if(Activity::where('id', $activityId)->exists()){
            Activity::destroy($activityId);
        } else{
            throw new ModelNotFoundException();
        }
        
    }

    /**
     * Undocumented function
     *
     * @param integer $activityId
     * @param array $updateArray
     * @return Activity
     */
    public static function update(int $activityId ,array $updateArray){
        $activity = Activity::findOrFail($activityId);
        foreach ($updateArray as $key => $value){
            $activity[$key] = $value;
        }

        $activity->save();
        return $activity;
    }
}
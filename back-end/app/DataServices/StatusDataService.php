<?php

namespace App\DataServices;

use App\Models\Status;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class StatusDataService
{
    /**
     * Undocumented function
     *
     * @return Status[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value){
        $query = Status::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'status', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $statusId
     * @return Status
     */
    public static function get(int $statusId, $joinTables, $value){
        $query = Status::query();
        \joinTables($query, 'status', $joinTables);
        return $query->findOrFail($statusId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Status[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value){
        $query = Status::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'status', $joinTables);
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
     * @return Status
     */
    public static function insert(array $inputArray){
        $status = new Status();
        foreach ($inputArray as $key => $value){
            $status[$key] = $value;
        }
        $status->save();
        return $status;
    }

    /**
     * Undocumented function
     *
     * @param integer $statusId
     * @param array $updateArray
     * @return Status
     */
    public static function update(int $statusId ,array $updateArray){
        $status = Status::findOrFail($statusId);
        foreach ($updateArray as $key => $value){
            $status[$key] = $value;
        }

        $status->save();
        return $status;
    }

    /**
     * Undocumented function
     *
     * @param integer $statusId
     * @return void
     */
    public static function delete(int $statusId){
        if(Status::where('id', $statusId)->exists()){
            Status::destroy($statusId);
        } else{
            throw new ModelNotFoundException();
        }
    }
}

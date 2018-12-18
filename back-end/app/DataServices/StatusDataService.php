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
    public static function getAll($joinTables, $sortOrder, $limit, $offset){
        $query = Status::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'status', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
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
     * @return Status
     */
    public static function get(int $statusId, $joinTables){
        $query = Status::query();
        \joinTables($query, 'status', $statusId);
        return $query->findOrFail($statusId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Status[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset){
        $query = Status::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'status', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $value){
            if($value['propName'] == 'name') {
                $query->whereRaw('LOWER(slug) like ?', ['%' . strtolower($value['value']) . '%']);
            }else{
                $query->where($value['propName'], $value['operator'], $value['value']);
            }
        }
        return $query->get();
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
}
<?php

namespace App\DataServices;

use App\Models\Brewery;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class BreweryDataService
{
    /**
     * Undocumented function
     *
     * @return Brewery[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset){
        $query = Brewery::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'brewery', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Brewery
     */
    public static function insert(array $inputArray){       
        $brewery = new Brewery();
        foreach ($inputArray as $key => $value){
            $brewery[$key] = $value;
        }
        $brewery->save();
        return $brewery;
    }

    /**
     * Undocumented function
     *
     * @param integer $breweryId
     * @return Brewery
     */
    public static function get(int $breweryId, $joinTables){
        $query = Brewery::query();
        \joinTables($query, 'brewery', $joinTables);
        return $query->findOrFail($breweryId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Brewery[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset){
        $query = Brewery::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'brewery', $joinTables);
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
     * @param integer $breweryId
     * @return void
     */
    public static function delete(int $breweryId){
        if(Brewery::where('id', $breweryId)->exists()){
            Brewery::destroy($breweryId);
        } else{
            throw new ModelNotFoundException();
        }
        
    }

    /**
     * Undocumented function
     *
     * @param integer $breweryId
     * @param array $updateArray
     * @return Brewery
     */
    public static function update(int $breweryId ,array $updateArray){
        $brewery = Brewery::findOrFail($breweryId);
        foreach ($updateArray as $key => $value){
            $brewery[$key] = $value;
        }

        $brewery->save();
        return $brewery;
    }
}
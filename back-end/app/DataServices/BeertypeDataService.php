<?php

namespace App\DataServices;

use App\Models\Beertype;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class BeertypeDataService
{
    /**
     * Undocumented function
     *
     * @return Beertype[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset){
        $query = Beertype::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'beertype', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Beertype
     */
    public static function insert(array $inputArray){       
        $beer = new Beertype();
        foreach ($inputArray as $key => $value){
            $beer[$key] = $value;
        }
        $beer->save();
        return $beer;
    }

    /**
     * Undocumented function
     *
     * @param integer $beertypeId
     * @return Beertype
     */
    public static function get(int $beertypeId, $joinTables){
        $query = Beertype::query();
        \joinTables($query, 'beertype', $joinTables);
        return $query->findOrFail($beertypeId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Beertype[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset){
        $query = Beertype::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'beertype', $joinTables);
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
     * @param integer $beertypeId
     * @return void
     */
    public static function delete(int $beertypeId){
        if(Beertype::where('id', $beertypeId)->exists()){
            Beertype::destroy($beertypeId);
        } else{
            throw new ModelNotFoundException();
        }
        
    }

    /**
     * Undocumented function
     *
     * @param integer $beertypeId
     * @param array $updateArray
     * @return Beertype
     */
    public static function update(int $beertypeId ,array $updateArray){
        $beer = Beertype::findOrFail($beertypeId);
        foreach ($updateArray as $key => $value){
            $beer[$key] = $value;
        }

        $beer->save();
        return $beer;
    }
}
<?php

namespace App\DataServices;

use App\Models\Beer;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class BeerDataService
{
    /**
     * Undocumented function
     *
     * @return Beer[]
     */
    public static function getAll($joinTables, $sortOrder)
    {
        $query = Beer::query();
        \joinTables($query, 'beer', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Beer
     */
    public static function insert(array $inputArray)
    {       
        $beer = new Beer();
        foreach ($inputArray as $key => $value){
            $beer[$key] = $value;
        }
        $beer->save();
        return $beer;
    }

    /**
     * Undocumented function
     *
     * @param integer $beerId
     * @return Beer
     */
    public static function get(int $beerId, $joinTables)
    {
        $query = Beer::query();
        \joinTables($query, 'beer', $joinTables);
        return Beer::with('brewery')->findOrFail($beerId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Beer[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder)
    {
        
        $query = Beer::query();
        \joinTables($query, 'beer', $joinTables);
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
     * @param integer $beerId
     * @return void
     */
    public static function delete(int $beerId)
    {
        if(Beer::where('id', $beerId)->exists()){
            Beer::destroy($beerId);
        } else{
            throw new ModelNotFoundException();
        }        
    }

    /**
     * Undocumented function
     *
     * @param integer $beerId
     * @param array $updateArray
     * @return Beer
     */
    public static function update(int $beerId ,array $updateArray)
    {
        $beer = Beer::findOrFail($beerId);
        foreach ($updateArray as $key => $value){
            $beer[$key] = $value;
        }

        $beer->save();
        return $beer;
    }
}
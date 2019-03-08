<?php

namespace App\DataServices;


class BeerFromBreweryDataService
{
    /**
     * Undocumented function
     *
     * @return BeerFromBrewery[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value){
        $query = BeerFromBrewery::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'beerFromBrewery', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $beerFromBreweryId
     * @return BeerFromBrewery
     */
    public static function get(int $beerFromBreweryId, $joinTables, $value){
        $query = BeerFromBrewery::query();
        \joinTables($query, 'beerFromBrewery', $joinTables);
        return $query->findOrFail($beerFromBreweryId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return BeerFromBrewery[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value){
        $query = BeerFromBrewery::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'beerFromBrewery', $joinTables);
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
     * @return BeerFromBrewery
     */
    public static function insert(array $inputArray){
        $beerFromBrewery = new BeerFromBrewery();
        foreach ($inputArray as $key => $value){
            $beerFromBrewery[$key] = $value;
        }
        $beerFromBrewery->save();
        return $beerFromBrewery;
    }

    /**
     * Undocumented function
     *
     * @param integer $beerFromBreweryId
     * @param array $updateArray
     * @return BeerFromBrewery
     */
    public static function update(int $beerFromBreweryId ,array $updateArray){
        $beerFromBrewery = BeerFromBrewery::findOrFail($beerFromBreweryId);
        foreach ($updateArray as $key => $value){
            $beerFromBrewery[$key] = $value;
        }

        $beerFromBrewery->save();
        return $beerFromBrewery;
    }

    /**
     * Undocumented function
     *
     * @param integer $beerFromBreweryId
     * @return void
     */
    public static function delete(int $beerFromBreweryId){
        if(BeerFromBrewery::where('id', $beerFromBreweryId)->exists()){
            BeerFromBrewery::destroy($beerFromBreweryId);
        } else{
            throw new ModelNotFoundException();
        }

    }
}

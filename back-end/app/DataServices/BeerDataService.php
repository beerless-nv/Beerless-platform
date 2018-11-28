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
    public static function getAll(){
        return Beer::all();
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Beer
     */
    public static function insert(array $inputArray){       
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
    public static function get(int $beerId){
        return Beer::with('brewery')->with('beertype')->findOrFail($beerId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Beer||Beer[]||null
     */
    public static function search(array $searchParams){

    }

    /**
     * Undocumented function
     *
     * @param integer $beerId
     * @return void
     */
    public static function delete(int $beerId){
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
    public static function update(int $beerId ,array $updateArray){
        $beer = Beer::findOrFail($beerId);
        foreach ($updateArray as $key => $value){
            $beer[$key] = $value;
        }

        $beer->save();
        return $beer;
    }
}
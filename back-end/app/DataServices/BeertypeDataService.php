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
    public static function getAll(){
        return Beertype::all();
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
    public static function get(int $beertypeId){
        return Beertype::findOrFail($beertypeId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Beertype||Beertype[]||null
     */
    public static function search(array $searchParams){

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
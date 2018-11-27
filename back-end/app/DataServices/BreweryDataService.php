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
    public static function getAll(){
        return Brewery::all();
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
    public static function get(int $breweryId){
        return Brewery::findOrFail($breweryId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Brewery||Brewery[]||null
     */
    public static function search(array $searchParams){

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
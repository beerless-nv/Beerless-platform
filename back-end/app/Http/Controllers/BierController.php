<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

/**
 * Contains CRUD functions for table 'Bier'.
 */
class BierController extends BaseController
{
    /**
     * Returns a specific JSON object of type 'Bier'.
     * Takes the id as a get parameter.
     * 
     * @return void
     */
    public function get() {
        if(app('request')->id){
            return json_encode(DB::table('Bier')->where('ID', app('request')->id)->first());
        } else{
            return "Not Found";
        }        
    }    

    /**
     * returns a JSON array of all columns in table 'Bier'.
     *
     * @return void
     */
    public function getAll() { 
        return json_encode(DB::table('Bier')->get()); 
    }
}
<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

/**
 * Contains CRUD functions for table 'Bier'.
 */
class BierController extends BaseController
{
    /**
     * Returns a specific JSON object of type 'Bier'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return void
     */
    public function get(Request $request) {
        $id = $request->input('id');
        if($id){
            $bier = DB::table('Bier')->where('ID', $id)->first();
            if($bier){
                return $bier;
            } else{
                return "Not Found";
            }
            return json_encode();
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
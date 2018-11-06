<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Bier;

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
     * @uses App\Models\Bier
     * @return void
     */
    public function get(Request $request) {
        $id = $request->input('id');
        if($id){
            if(Bier::where('ID', $id)->exists()){
                return Bier::where('ID', $id)->first();
            } else{
                return "false";
            }
            return json_encode();
        } else{
            return "false";
        }        
    }
    
    /**
     * returns a specific JSON object of type 'Bier'.
     * Tkakes the name as a request parameter.
     *
     * @param Request $request
     * @uses App\Models\Bier
     * @return void
     */
    public function getByNaam(Request $request){
        $naam = $request->input("naam");
        if($naam){
            return json_encode(Bier::whereRaw("LOWER(Bier.naam) Like ?", ['%' . strtolower($naam) . '%'])
                                        ->with('Brouwerij')
                                        ->with('Biersoort')
                                        ->get());
        }
    }

    /**
     * returns a JSON array of all columns in table 'Bier'
     *
     * @uses App\Models\Bier
     * @return void
     */

    public function getAll() { 
        return json_encode(Bier::with('Biersoort')->with('Brouwerij')->get());
    }

    /**
     * Insert an item into table 'Bier'.
     * Takes the item fields as request parameters.
     * Requires the field 'naam'.
     *
     * @param Request $request
     * @return void
     */
    public function insert(Request $request){
        $naam = $request->input('naam');
        if($naam){
            $bier = array(
                'naam' => $naam,
                'alcoholpercentage' => $request->input('alcoholpercentage'),
                'IBU' => $request->input('IBU'),
                'EBC' => $request->input('EBC'),
                'ingredienten' => $request->input('ingredienten'),
                'temperatuur' => $request->input('temperatuur'),
                'gisting' => $request->input('gisting'),
                'glas' => $request->input('glas'),
                'afbeelding' => $request->input('afbeelding'),
                'seizoen' => $request->input('seizoen'),
                'sinds' => $request->input('sinds'),
                'brouwerijID' => $request->input('brouwerijID'),
                'biersoortID' => $request->input('biersoortID'),
            );
            if(DB::table('Bier')->insertGetId($bier)){
                return "true";
            } else{
                return "false";
            }            
        } else{
            return "false";
        }
        return $request;
    }

    /**
     * Deletes an item in table 'Bier'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return void
     */
    public function delete(Request $request){
        $id = $request->input('id');
        if($id){
            $query = DB::table('Bier')->where('ID', $id);
            if($query->exists()){
                $query->delete();
                return "true";
            } else{
                return "false";
            }
        } else{
            return "false";
        }
    }

    /**
     * Updates an item in table 'Bier'.
     * Takes the item fields as request parameters.
     * Requires the field 'id' and 'naam'.
     *
     * @param Request $request
     * @return void
     */
    public function update(Request $request){
        $id = $request->input('id');
        $naam = $request->input('naam');
        if($naam && $id){
            $bier = array(
                'naam' => $naam,
                'alcoholpercentage' => $request->input('alcoholpercentage'),
                'IBU' => $request->input('IBU'),
                'EBC' => $request->input('EBC'),
                'ingredienten' => $request->input('ingredienten'),
                'temperatuur' => $request->input('temperatuur'),
                'gisting' => $request->input('gisting'),
                'glas' => $request->input('glas'),
                'afbeelding' => $request->input('afbeelding'),
                'seizoen' => $request->input('seizoen'),
                'sinds' => $request->input('sinds'),
                'brouwerijID' => $request->input('brouwerijID'),
                'biersoortID' => $request->input('biersoortID'),
            );
            if(DB::table('Bier')->where('ID', $id)->update($bier)){
                return "true";
            } else{
                return "false";
            }            
        } else{
            return "false";
        }
    }
}
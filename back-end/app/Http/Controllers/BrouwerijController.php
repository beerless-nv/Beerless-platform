<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

/**
 * Contains CRUD functions for table 'Brouwerij'.
 */
class BrouwerijController extends BaseController
{
    /**
     * Returns a specific JSON object of type 'Brouwerij'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return void
     */
    public function get(Request $request) {
        $id = $request->input('id');
        if($id){
            $brouwerij = DB::table('Brouwerij')->where('ID', $id)->first();
            if($brouwerij){
                return $brouwerij;
            } else{
                return "false";
            }
            return json_encode(); 
        } else{
            return "false";
        }
    }    

    /**
     * returns a JSON array of all columns in table 'Brouwerij'.
     *
     * @return void
     */
    public function getAll() { 
        return json_encode(DB::table('Brouwerij')->get());
    }

    /**
     * Insert an item into table 'Brouwerij'.
     * Takes the item fields as request parameters.
     * Requires the field 'naam'.
     *
     * @param Request $request
     * @return void
     */
    public function insert(Request $request){
        $naam = $request->input('naam');
        if($naam){
            $brouwerij = array(
                'naam' => $naam,
                'beschrijving' => $request->input('beschrijving'),
                'land' => $request->input('land'),
                'provincie' => $request->input('provincie'),
                'plaats' => $request->input('plaats'),
                'postcode' => $request->input('postcode'),
                'straatEnNummer' => $request->input('straatEnNummer'),
                'logo' => $request->input('logo'),
                'aantalBieren' => $request->input('aantalBieren'),
                'contactID' => $request->input('contactID')
            );
            if(DB::table('Brouwerij')->insertGetId($brouwerij)){
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
     * Deletes an item in table 'Brouwerij'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return void
     */
    public function delete(Request $request){
        $id = $request->input('id');
        if($id){
            $query = DB::table('Brouwerij')->where('ID', $id);
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
     * Updates an item in table 'Brouwerij'.
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
            $brouwerij = array(
                'naam' => $naam,
                'beschrijving' => $request->input('beschrijving'),
                'land' => $request->input('land'),
                'provincie' => $request->input('provincie'),
                'plaats' => $request->input('plaats'),
                'postcode' => $request->input('postcode'),
                'straatEnNummer' => $request->input('straatEnNummer'),
                'logo' => $request->input('logo'),
                'aantalBieren' => $request->input('aantalBieren'),
                'contactID' => $request->input('contactID')
            );
            if(DB::table('Brouwerij')->where('ID', $id)->update($brouwerij)){
                return "true";
            } else{
                return "false";
            }            
        } else{
            return "false";
        }
    }
}
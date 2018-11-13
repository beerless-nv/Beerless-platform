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
     * @return Response
     */
    public function get(Request $request) {
        $id = $request->input('id');
        if($id){
            if(Bier::where('ID', $id)->exists()){
                return Bier::where('ID', $id)->first();
            } else{
                return "false";
            }
        } else{
            return "false";
        }
    }

    /**
     * returns a specific JSON object or a JSON array of type 'Bier'.
     * Tkakes the name as a request parameter.
     *
     * @param Request $request
     * @uses App\Models\Bier
     * @return Response
     */
    public function getByNaam(Request $request){
        $naam = $request->input("naam");
        if($naam){
            return response()->json(Bier::whereRaw("LOWER(Bier.naam) Like ?", ['%' . strtolower($naam) . '%'])
                                                ->with('Brouwerij')
                                                ->with('Biersoort')
                                                ->get());
        }
    }

    /**
     * returns a JSON array of all columns in table 'Bier'
     *
     * @uses App\Models\Bier
     * @return Reponse
     */
    public function getAll() {
        return response()->json(Bier::with('Biersoort')->with('Brouwerij')->get());
    }

    /**
     * Insert an item into table 'Bier'.
     * Takes the item fields as request parameters.
     * Requires the field 'naam'.
     *
     * @param Request $request
     * @uses App\Models\Bier
     * @return void
     */
    public function insert(Request $request){
//        $postdata = $request->json()->all();
//        $object = json_decode($postdata, true);
        $object = json_decode(json_encode($request->input()), true);
//        $data = Input::all();


//        $resultaat = $request->input();


//        if($naam){
//            $bier = new Bier;
//            $bier->naam = $object->naam;
//            $bier->alcoholpercentage = $request->input('alcoholpercentage');
//            $bier->IBU = $request->input('IBU');
//            $bier->EBC = $request->input('EBC');
//            $bier->ingredienten = $request->input('ingredienten');
//            $bier->temperatuur = $request->input('temperatuur');
//            $bier->gisting = $request->input('gisting');
//            $bier->glas = $request->input('glas');
//            $bier->afbeelding = $request->input('afbeelding');
//            $bier->seizoen = $request->input('seizoen');
//            $bier->sinds = $request->input('sinds');
//            $bier->brouwerijID = $request->input('brouwerijID');
//            $bier->biersoortID = $request->input('biersoortID');
//
//            var_dump($bier);
//
//            $bier->save();
//        } else{
//            return "false";
//        }
//        return $naam;
        return $object;
    }

    /**
     * Deletes an item in table 'Bier'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @uses App\Models\Bier
     * @return void
     */
    public function delete(Request $request){
        $id = $request->input('id');
        if($id && Bier::where('ID', $id)->exists()){
            $bier = Bier::find($id);
            $bier->delete();
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
     * @uses App\Models\Bier
     * @return void
     */
    public function update(Request $request){
        $id = $request->input('id');
        $naam = $request->input('naam');
        if($naam && $id && Bier::where('ID', $id)->exists()){
            $bier = Bier::find($id);

            $bier->naam = $naam;
            $bier->alcoholpercentage = $request->input('alcoholpercentage');
            $bier->IBU = $request->input('IBU');
            $bier->EBC = $request->input('EBC');
            $bier->ingredienten = $request->input('ingredienten');
            $bier->temperatuur = $request->input('temperatuur');
            $bier->gisting = $request->input('gisting');
            $bier->glas = $request->input('glas');
            $bier->afbeelding = $request->input('afbeelding');
            $bier->seizoen = $request->input('seizoen');
            $bier->sinds = $request->input('sinds');
            $bier->brouwerijID = $request->input('brouwerijID');
            $bier->biersoortID = $request->input('biersoortID');

            $bier->save();
        } else{
            return "false";
        }
    }
}
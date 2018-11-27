<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Beertype;
use App\DataServices\BeertypeDataService;

class BeertypeController extends Controller
{
    /**
     * returns a JSON array of all columns in table 'Beertype'
     *
     * GET /beertypes
     * 
     * @uses App\Models\Beertype
     * @return Reponse
     */
    public function getAll()
    {
        return response()->json([
            'success' => true,
            'beertypes' => BeertypeDataService::getAll()
        ], 200);
    }

    /**
     * Undocumented function
     * 
     * POST /beertypes
     *
     * @param Reqeust $request
     * @return Response
     */
    public function insert(Request $request){
        $beertype;
        if(isset($request->input('inputArray')['name'])){
            $beertype = BeertypeDataService::insert($request->input('inputArray'));
        } else{
            return response()->json([
                'success' => false,
                'msg' => 'name_required'
            ], 400);
        }
        
        return response()->json([
            'success' => true,
            'beertype' => $beertype
        ], 201);
    }

    /**
     * Returns a specific JSON object of type 'Beertype'.
     * Takes the id as a request parameter.
     * 
     * GET /beertypes/beertypeId
     *
     * @param Request $request
     * @uses App\Models\Beertype
     * @return Response
     */
    public function get(Request $request, int $beertypeId)
    {
        return response()->json([
            'success' => true,
            'beertype' => BeertypeDataService::get($beertypeId)
        ],200);
    }

    public function search(Request $request){
        
    }

    public function delete(Request $request, int $beertypeId){
        BeertypeDataService::delete($beertypeId);
        return response()->json([
            'success' => true
        ], 204);
    }

    public function patch(Request $request, int $beertypeId){
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $beertype = BeertypeDataService::update($beertypeId, $updateArray);
        return response()->json([
            'success' => true,
            'beertype' => $brewery
        ], 200);
    }
}

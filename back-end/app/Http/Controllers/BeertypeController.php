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
    public function getAll(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if($orderBy != null){$sortOrder[$orderBy[0]] = $orderBy[1];} 
        else {$sortOrder = null;}

        return response()->json([
            'success' => true,
            'beertypes' => BeertypeDataService::getAll($joinTables, $sortOrder)
        ], 200);
    }

    /**
     * Insert an item into table 'Beertype'.
     * Requires the field 'name'.
     * 
     * POST /beertypes
     *
     * @param Reqeust $request
     * @return Response
     */
    public function insert(Request $request){
        $beertype;
        if(isset($request->input('inputObject')['name'])){
            $beertype = BeertypeDataService::insert($request->input('inputObject'));
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
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        return response()->json([
            'success' => true,
            'beertype' => BeertypeDataService::get($beertypeId, $joinTables)
        ],200);
    }

    public function search(Request $request){
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if($orderBy != null){$sortOrder[$orderBy[0]] = $orderBy[1];} 
        else {$sortOrder = null;}

        return response()->json([
            "success" => true,
            'beers' => BeerTypeDataService::search($request->input('searchParams'), $joinTables, $sortOrder)
        ]);
    }

    /**
     * Deletes an item in table 'Beertype'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @param integer $beertypeId
     * @return Response
     */
    public function delete(Request $request, int $beertypeId){
        BeertypeDataService::delete($beertypeId);
        return response()->json([
            'success' => true
        ], 204);
    }

    /**
     * Updates an entry in the table 'Beertype'.
     * 
     * PATCH /beertypes/beertypeId
     *
     * @param Request $request
     * @param integer $beertypeId
     * @return void
     */
    public function patch(Request $request, int $beertypeId){
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $beertype = BeertypeDataService::update($beertypeId, $updateArray);
        return response()->json([
            'success' => true,
            'beertype' => $beertype
        ], 200);
    }
}

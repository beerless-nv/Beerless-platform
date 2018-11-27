<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Brewery;
use App\DataServices\BreweryDataService;

/**
 * Contains CRUD functions for table 'Brewery'.
 */
class BreweryController extends Controller
{
     /**
      * Returns a JSON array of all columns in table 'Brewery'.
      * 
      * GET /breweries
      *
      * @param Request $request
      * @return Response
      */
    public function getAll(Request $request)
    {
        return response()->json([
            'success' => true,
            'breweries' => BreweryDataService::getAll()
        ], 200);
    }

    /**
     * Insert an item into table 'Brewery'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     * 
     * POST /breweries
     *
     * @param Request $request
     * @return Response
     */
    public function insert(Request $request)
    {
        $brewery;
        if(isset($request->input('inputArray')['name'])){
            $brewery = BreweryDataService::insert($request->input('inputArray'));
        } else{
            return response()->json([
                'success' => false,
                'msg' => 'name_required'
            ], 400);
        }
        
        return response()->json([
            'success' => true,
            'brewery' => $brewery
        ], 201);
    }


     /**
      * Returns a specific JSON object of type 'Brewery'.
      * Takes the id as a request parameter.
      * 
      * GET /breweries/breweryId
      *
      * @param Request $request
      * @param integer $breweryId
      * @return Response
      */
    public function get(Request $request, int $breweryId)
    {
        return response()->json([
            'success' => true,
            'brewery' => BreweryDataService::get($breweryId)
        ],200);
    }
    

    public function search(Request $request){
        
    }

    /**
     * Deletes an item in table 'Brewery'.
     * Takes the id as a request parameter.
     * 
     * DELETE /breweries/breweryId
     *
     * @param Request $request
     * @param integer $breweryId
     * @return Response
     */
    public function delete(Request $request, int $breweryId)
    {
        Brewery::delete($breweryId);
        return response()->json([
            'success' => true
        ], 204);
    }


    /**
     * Updates an entry in the table 'Brewery'.
     * 
     * PATCH /breweries/breweryId
     *
     * @param Request $request
     * @param integer $breweryId
     * @return Response
     */
    public function patch(Request $request, int $breweryId){
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $brewery = BreweryDataService::update($breweryId, $updateArray);
        return response()->json([
            'success' => true,
            'brewery' => $brewery
        ], 200);
    }


    /**
     * Returns a specific JSON object or a JSON array of type 'Brewery'.
     * Takes the name as a request parameter.
     *
     * @param Request $request
     * @return Response
     */
    public function getByName(Request $request)
    {
        $name = $request->input("name");
        if ($name) {
            return response()->json(Brewery::whereRaw("LOWER(Brewery.name) Like ?", ['%' . strtolower($name) . '%'])->get());
        }
    }    

    /**
     * Returns a JSON array of all records from table 'Brewery' with columns 'id' and 'name'.
     *
     * @return Response
     */
    public function getAllNameId()
    {
        return response()->json(Brewery::select('id', 'name')->get());
    }
}

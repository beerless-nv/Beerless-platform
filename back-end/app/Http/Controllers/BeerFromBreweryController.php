<?php

namespace App\Http\Controllers;

use App\DataServices\BeerFromBreweryDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Contains CRUD functions for table 'BeerFromBrewery"
 */
class BeerFromBreweryController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'BeerFromBrewery'.
     *
     * GET /beerfrombreweries
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getAll(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if($orderBy != null){$sortOrder[$orderBy[0]] = $orderBy[1];}
        else {$sortOrder = null;}

        $limit = null;
        if($request->query('limit') != null){
            $limit = intval($request->query('limit'));
            if(!is_int($limit) || $limit < 1){
                return response()->json([
                    'succes' => false,
                    'msg' => 'limit_not_valid'
                ]);
            }
        }

        $offset = null;
        if($request->query('offset') != null){
            $offset = intval($request->query('offset'));
            if(!is_int($offset) || $offset < 1){
                return response()->json([
                    'succes' => false,
                    'msg' => 'offset_not_valid'
                ]);
            } if($limit == null){
                return response()->json([
                    'success' => false,
                    'msg' => 'limit_not_set'
                ]);
            }
        }

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'beerfrombreweries' => BeerFromBreweryDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'BeerFromBrewery'.
     * Takes the id as a request parameter.
     *
     * GET /beerfrombreweries/beerFromBreweryId
     *
     * @param integer $beerFromBreweryId
     * @return Reponse
     */
    public function get(Request $request, int $beerFromBreweryId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'beerFromBrewery' => BeerFromBreweryDataService::get($beerFromBreweryId, $joinTables, $value)
        ],200);
    }

    /**
     * Undocumented function
     *
     * GET /beerfrombreweries/search
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if($orderBy != null){$sortOrder[$orderBy[0]] = $orderBy[1];}
        else {$sortOrder = null;}

        $limit = null;
        if($request->query('limit') != null){
            $limit = intval($request->query('limit'));
            if(!is_int($limit) || $limit < 1){
                return response()->json([
                    'succes' => false,
                    'msg' => 'limit_not_valid'
                ]);
            }
        }

        $offset = null;
        if($request->query('offset') != null){
            $offset = intval($request->query('offset'));
            if(!is_int($offset) || $offset < 1){
                return response()->json([
                    'succes' => false,
                    'msg' => 'offset_not_valid'
                ]);
            } if($limit == null){
                return response()->json([
                    'success' => false,
                    'msg' => 'limit_not_set'
                ]);
            }
        }

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            "success" => true,
            'beerfrombreweries' => BeerFromBreweryDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'BeerFromBrewery'.
     * Takes the item fields as request parameters.
     * Requires the field 'title'.
     *
     * POST /beerfrombreweries
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function insert(Request $request)
    {
        // Validate incoming requests
        $validator = Validator::make($request->all(), [
            'inputObject.beerID' => 'required|numeric',
            'inputObject.breweryID' => 'required|numeric',
        ],
            [
                'inputObject.beerID.required' => 'beer_required',
                'inputObject.beerID.numeric' => 'beerID_not_numeric',
                'inputObject.breweryID.required' => 'brewery_required',
                'inputObject.breweryID.numeric' => 'breweryID_not_numeric',
            ]);

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $beerFromBrewery = BeerFromBreweryDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'beerFromBrewery' => $beerFromBrewery
        ], 201);
    }

    /**
     * Updates an item in table 'BeerFromBrewery'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     *
     * PATCH /beerfrombreweries/$beerFromBreweryId
     *
     * @param Request $request
     * @param integer $beerFromBreweryId
     * @return JsonResponse
     */
    public function patch(Request $request, int $beerFromBreweryId)
    {
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $beerFromBrewery = BeerFromBreweryDataService::update($beerFromBreweryId, $updateArray);
        return response()->json([
            'success' => true,
            'beerFromBrewery' => $beerFromBrewery
        ], 200);
    }

    /**
     * Deletes an item in table 'BeerFromBrewery'.
     * Takes the id as a request parameter.
     *
     * DELETE /beerfrombreweries/beerFromBreweryId
     *
     * @param Request $request
     * @param integer $beerFromBreweryId
     * @return JsonResponse
     */
    public function delete(Request $request, int $beerFromBreweryId)
    {
        BeerFromBreweryDataService::delete($beerFromBreweryId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

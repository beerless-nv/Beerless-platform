<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Brewery;
use App\DataServices\BreweryDataService;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Contains CRUD functions for table 'Brewery'.
 */
class BreweryController extends Controller
{
    /**
     * Validator for the table 'Brewery'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|unique:brewery,name',
            'description' => 'required',
            'country' => 'required',
            'streetAndNumber' => 'required',
            'province' => 'required',
        ],
            [
                'name.required' => 'name_required',
                'name.unique' => 'name_not_unique',
                'description.required' => 'description_required',
                'country.required' => 'country_required',
                'streetAndNumber.required' => 'streetAndNumber_required',
                'province.required' => 'province_required',
            ]);
    }




    /**
     * Returns a JSON array of all columns in table 'Brewery'.
     *
     * GET /breweries
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getAll(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if ($orderBy != null) {
            $sortOrder[$orderBy[0]] = $orderBy[1];
        } else {
            $sortOrder = null;
        }

        $limit = null;
        if ($request->query('limit') != null) {
            $limit = intval($request->query('limit'));
            if (!is_int($limit) || $limit < 1) {
                return response()->json([
                    'succes' => false,
                    'msg' => 'limit_not_valid'
                ]);
            }
        }

        $offset = null;
        if ($request->query('offset') != null) {
            $offset = intval($request->query('offset'));
            if (!is_int($offset) || $offset < 1) {
                return response()->json([
                    'succes' => false,
                    'msg' => 'offset_not_valid'
                ]);
            }
            if ($limit == null) {
                return response()->json([
                    'success' => false,
                    'msg' => 'limit_not_set'
                ]);
            }
        }

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'breweries' => BreweryDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }


    /**
     * Returns a specific JSON object of type 'Brewery'.
     * Takes the id as a request parameter.
     *
     * GET /breweries/breweryId
     *
     * @param Request $request
     * @param integer $breweryId
     * @return JsonResponse
     */
    public function get(Request $request, int $breweryId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'brewery' => BreweryDataService::get($breweryId, $joinTables, $value)
        ], 200);
    }

    /**
     * Returns a JSON array of all records from table 'Brewery' that match with the given parameters.
     *
     * GET /breweries/search
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if ($orderBy != null) {
            $sortOrder[$orderBy[0]] = $orderBy[1];
        } else {
            $sortOrder = null;
        }

        $limit = null;
        if ($request->query('limit') != null) {
            $limit = intval($request->query('limit'));
            if (!is_int($limit) || $limit < 1) {
                return response()->json([
                    'succes' => false,
                    'msg' => 'limit_not_valid'
                ]);
            }
        }

        $offset = null;
        if ($request->query('offset') != null) {
            $offset = intval($request->query('offset'));
            if (!is_int($offset) || $offset < 1) {
                return response()->json([
                    'succes' => false,
                    'msg' => 'offset_not_valid'
                ]);
            }
            if ($limit == null) {
                return response()->json([
                    'success' => false,
                    'msg' => 'limit_not_set'
                ]);
            }
        }

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            "success" => true,
            'breweries' => BreweryDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     *
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getBeersFromBrewery(Request $request)
    {


        return response()->json([
            "success" => true,
            'breweries' => []
        ]);
    }

    /**
     * Insert an item into table 'Brewery'.
     *
     * POST /breweries
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function insert(Request $request)
    {
        $validator = $this->validator($request->input('inputObject'));

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $brewery = BreweryDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'brewery' => $brewery
        ], 201);
    }

    /**
     * Updates an entry in the table 'Brewery'.
     *
     * PUT /breweries/breweryId
     *
     * @param Request $request
     * @param integer $breweryId
     * @return JsonResponse
     */
    public function update(Request $request, int $breweryId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $brewery = BreweryDataService::update($breweryId, $request->input('updateObject'));
        }
        
        return response()->json([
            'success' => true,
            'brewery' => $brewery
        ], 200);
    }

    /**
     * Deletes an item in table 'Brewery'.
     * Takes the id as a request parameter.
     *
     * DELETE /breweries/breweryId
     *
     * @param Request $request
     * @param integer $breweryId
     * @return JsonResponse
     */
    public function delete(Request $request, int $breweryId)
    {
        BreweryDataService::delete($breweryId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

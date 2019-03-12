<?php

namespace App\Http\Controllers;

use App\DataServices\TastingprofileDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Contains CRUD functions for table 'Tastingprofile'.
 */
class TastingprofileController extends Controller
{
    /**
     * Validator for the table 'Tastingprofile'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'malty' => 'required|numeric',
            'sweet' => 'required|numeric',
            'sour' => 'required|numeric',
            'hoppy' => 'required|numeric',
            'bitter' => 'required|numeric',
            'fruity' => 'required|numeric',
            'userID' => 'required|numeric',
            'beerID' => 'required|numeric',
        ],
            [
                'malty.required' => 'malty_required',
                'malty.numeric' => 'malty_not_numeric',
                'sweet.required' => 'sweet_required',
                'sweet.numeric' => 'sweet_not_numeric',
                'sour.required' => 'sour_required',
                'sour.numeric' => 'sour_not_numeric',
                'hoppy.required' => 'hoppy_required',
                'hoppy.numeric' => 'hoppy_not_numeric',
                'bitter.required' => 'bitter_required',
                'bitter.numeric' => 'bitter_not_numeric',
                'fruity.required' => 'fruity_required',
                'fruity.numeric' => 'fruity_not_numeric',
                'userID.required' => 'user_required',
                'userID.numeric' => 'userID_not_numeric',
                'beerID.required' => 'beer_required',
                'beerID.numeric' => 'beerID_not_numeric',
            ]);
    }


    /**
     * Returns a JSON array of all rows in table 'Tastingprofile'.
     *
     * GET /tastingprofiles
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
            'tastingprofiles' => TastingprofileDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'Tastingprofile'.
     * Takes the id as a request parameter.
     *
     * GET /tastingprofiles/tastingprofileId
     *
     * @param Request $request
     * @param integer $tastingprofileId
     * @return JsonResponse
     */
    public function get(Request $request, int $tastingprofileId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'tastingprofile' => TastingprofileDataService::get($tastingprofileId, $joinTables, $value)
        ], 200);
    }

    /**
     * Returns a JSON array of all rows in table 'Tastingprofile' which match with the specified search parameters.
     *
     * GET /tastingprofiles/search
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
            'tastingprofiles' => TastingprofileDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Tastingprofile'.
     * Takes the item fields as request parameters.
     *
     * POST /tastingprofiles
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
            $tastingprofile = TastingprofileDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'tastingprofile' => $tastingprofile
        ], 201);
    }

    /**
     * Updates an item in table 'Tastingprofile'.
     * Takes the item fields as request parameters.
     *
     * PUT /tastingprofiles/$tastingprofileId
     *
     * @param Request $request
     * @param integer $tastingprofileId
     * @return JsonResponse
     */
    public function update(Request $request, int $tastingprofileId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $tastingprofile = TastingprofileDataService::update($tastingprofileId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'tastingprofile' => $tastingprofile
        ], 200);
    }

    /**
     * Deletes an item in table 'Tastingprofile'.
     * Takes the id as a request parameter.
     *
     * DELETE /tastingprofiles/tastingprofileId
     *
     * @param Request $request
     * @param integer $tastingprofileId
     * @return JsonResponse
     */
    public function delete(Request $request, int $tastingprofileId)
    {
        TastingprofileDataService::delete($tastingprofileId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

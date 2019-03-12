<?php

namespace App\Http\Controllers;

use App\DataServices\StyleTagDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Contains CRUD functions for table 'StyleTag'.
 */
class StyleTagController extends Controller
{
    /**
     * Validator for the table 'StyleTag'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|unique:styletag,name',
            'styleTagCategoryID' => 'required|numeric',
        ],
            [
                'name.required' => 'name_required',
                'styleTagCategoryID.required' => 'styleTagCategory_required',
                'styleTagCategoryID.numeric' => 'styleTagCategoryID_not_numeric',
            ]);
    }


    /**
     * Returns a JSON array of all rows in table 'StyleTag'.
     *
     * GET /styletags
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
            'styletags' => StyleTagDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'StyleTag'.
     * Takes the id as a request parameter.
     *
     * GET /styletags/styleTagId
     *
     * @param Request $request
     * @param integer $styleTagId
     * @return JsonResponse
     */
    public function get(Request $request, int $styleTagId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'styleTag' => StyleTagDataService::get($styleTagId, $joinTables, $value)
        ], 200);
    }

    /**
     * Returns a JSON array of all rows in table 'StyleTag' which match with the specified search parameters.
     *
     * GET /styletags/search
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
            'styletags' => StyleTagDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'StyleTag'.
     * Takes the item fields as request parameters.
     *
     * POST /styletags
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
            $styleTag = StyleTagDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'styleTag' => $styleTag
        ], 201);
    }

    /**
     * Updates an item in table 'StyleTag'.
     * Takes the item fields as request parameters.
     *
     * PUT /styletags/$styleTagId
     *
     * @param Request $request
     * @param integer $styleTagId
     * @return JsonResponse
     */
    public function update(Request $request, int $styleTagId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $styleTag = StyleTagDataService::update($styleTagId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'styleTag' => $styleTag
        ], 200);
    }

    /**
     * Deletes an item in table 'StyleTag'.
     * Takes the id as a request parameter.
     *
     * DELETE /styletags/styleTagId
     *
     * @param Request $request
     * @param integer $styleTagId
     * @return JsonResponse
     */
    public function delete(Request $request, int $styleTagId)
    {
        StyleTagDataService::delete($styleTagId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

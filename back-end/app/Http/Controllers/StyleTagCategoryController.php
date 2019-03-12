<?php

namespace App\Http\Controllers;

use App\DataServices\StyleTagCategoryDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Contains CRUD functions for table 'StyleTagCategory'.
 */
class StyleTagCategoryController extends Controller
{
    /**
     * Validator for the table 'StyleTagCategory'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|unique:styletagcategory,name',
        ],
            [
                'name.required' => 'name_required',
                'name.unique' => 'name_not_unique',
            ]);
    }


    /**
     * Returns a JSON array of all rows in table 'StyleTagCategory'.
     *
     * GET /styletagcategories
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
            'styletagcategories' => StyleTagCategoryDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'StyleTagCategory'.
     * Takes the id as a request parameter.
     *
     * GET /styletagcategories/styleTagCategoryId
     *
     * @param Request $request
     * @param integer $styleTagCategoryId
     * @return JsonResponse
     */
    public function get(Request $request, int $styleTagCategoryId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'styleTagCategory' => StyleTagCategoryDataService::get($styleTagCategoryId, $joinTables, $value)
        ], 200);
    }

    /**
     * Returns a JSON array of all rows in table 'StyleTagCategory' which match with the specified search parameters.
     *
     * GET /styletagcategories/search
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
            'styletagcategories' => StyleTagCategoryDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'StyleTagCategory'.
     * Takes the item fields as request parameters.
     *
     * POST /styletagcategories
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
            $styleTagCategory = StyleTagCategoryDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'styleTagCategory' => $styleTagCategory
        ], 201);
    }

    /**
     * Updates an item in table 'StyleTagCategory'.
     * Takes the item fields as request parameters.
     *
     * PUT /styletagcategories/$styleTagCategoryId
     *
     * @param Request $request
     * @param integer $styleTagCategoryId
     * @return JsonResponse
     */
    public function update(Request $request, int $styleTagCategoryId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $styleTagCategory = StyleTagCategoryDataService::update($styleTagCategoryId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'styleTagCategory' => $styleTagCategory
        ], 200);
    }

    /**
     * Deletes an item in table 'StyleTagCategory'.
     * Takes the id as a request parameter.
     *
     * DELETE /styletagcategories/styleTagCategoryId
     *
     * @param Request $request
     * @param integer $styleTagCategoryId
     * @return JsonResponse
     */
    public function delete(Request $request, int $styleTagCategoryId)
    {
        StyleTagCategoryDataService::delete($styleTagCategoryId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

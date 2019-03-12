<?php

namespace App\Http\Controllers;

use App\DataServices\PermissionDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Contains CRUD functions for table 'Permission'.
 */
class PermissionController extends Controller
{
    /**
     * Validator for the table 'Permission'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|unique:permission,name',
            'description' => 'required',
        ],
            [
                'name.required' => 'name_required',
                'name.unique' => 'name_not_unique',
                'description.required' => 'description_required',
            ]);
    }


    /**
     * Returns a JSON array of all rows in table 'Permission'.
     *
     * GET /permissions
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
            'permissions' => PermissionDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'Permission'.
     * Takes the id as a request parameter.
     *
     * GET /permissions/permissionId
     *
     * @param Request $request
     * @param integer $permissionId
     * @return JsonResponse
     */
    public function get(Request $request, int $permissionId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'permission' => PermissionDataService::get($permissionId, $joinTables, $value)
        ], 200);
    }

    /**
     * Returns a JSON array of all rows in table 'Permission' which match with the specified search parameters.
     *
     * GET /permissions/search
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
            'permissions' => PermissionDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Permission'.
     * Takes the item fields as request parameters.
     *
     * POST /permissions
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
            $permission = PermissionDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'permission' => $permission
        ], 201);
    }

    /**
     * Updates an item in table 'Permission'.
     * Takes the item fields as request parameters.
     *
     * PUT /permissions/$permissionId
     *
     * @param Request $request
     * @param integer $permissionId
     * @return JsonResponse
     */
    public function update(Request $request, int $permissionId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $permission = PermissionDataService::update($permissionId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'permission' => $permission
        ], 200);
    }

    /**
     * Deletes an item in table 'Permission'.
     * Takes the id as a request parameter.
     *
     * DELETE /permissions/permissionId
     *
     * @param Request $request
     * @param integer $permissionId
     * @return JsonResponse
     */
    public function delete(Request $request, int $permissionId)
    {
        PermissionDataService::delete($permissionId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

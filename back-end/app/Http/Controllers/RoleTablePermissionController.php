<?php

namespace App\Http\Controllers;

use App\DataServices\RoleTablePermissionDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Contains CRUD functions for table 'RoleTablePermission'.
 */
class RoleTablePermissionController extends Controller
{
    /**
     * Validator for the table 'RoleTablePermission'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'roleID' => 'required|numeric',
            'permissionID' => 'required|numeric',
            'tableName' => 'required',
        ],
            [
                'roleID.required' => 'role_required',
                'roleID.numeric' => 'roleID_not_numeric',
                'permissionID.required' => 'permission_required',
                'permissionID.numeric' => 'permissionID_not_numeric',
                'tableName.required' => 'tableName_required',
            ]);
    }


    /**
     * Returns a JSON array of all rows in table 'RoleTablePermission'.
     *
     * GET /roletablepermissions
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
            'roletablepermissions' => RoleTablePermissionDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'RoleTablePermission'.
     * Takes the id as a request parameter.
     *
     * GET /roletablepermissions/roleTablePermissionId
     *
     * @param Request $request
     * @param integer $roleTablePermissionId
     * @return JsonResponse
     */
    public function get(Request $request, int $roleTablePermissionId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'roleTablePermission' => RoleTablePermissionDataService::get($roleTablePermissionId, $joinTables, $value)
        ], 200);
    }

    /**
     * Returns a JSON array of all rows in table 'RoleTablePermission' which match with the specified search parameters.
     *
     * GET /roletablepermissions/search
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
            'roletablepermissions' => RoleTablePermissionDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'RoleTablePermission'.
     * Takes the item fields as request parameters.
     *
     * POST /roletablepermissions
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
            $roleTablePermission = RoleTablePermissionDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'roleTablePermission' => $roleTablePermission
        ], 201);
    }

    /**
     * Updates an item in table 'RoleTablePermission'.
     * Takes the item fields as request parameters.
     *
     * PUT /roletablepermissions/$roleTablePermissionId
     *
     * @param Request $request
     * @param integer $roleTablePermissionId
     * @return JsonResponse
     */
    public function update(Request $request, int $roleTablePermissionId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $roleTablePermission = RoleTablePermissionDataService::update($roleTablePermissionId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'roleTablePermission' => $roleTablePermission
        ], 200);
    }

    /**
     * Deletes an item in table 'RoleTablePermission'.
     * Takes the id as a request parameter.
     *
     * DELETE /roletablepermissions/roleTablePermissionId
     *
     * @param Request $request
     * @param integer $roleTablePermissionId
     * @return JsonResponse
     */
    public function delete(Request $request, int $roleTablePermissionId)
    {
        RoleTablePermissionDataService::delete($roleTablePermissionId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

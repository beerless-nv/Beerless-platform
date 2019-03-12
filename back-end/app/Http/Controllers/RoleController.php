<?php

namespace App\Http\Controllers;

use App\DataServices\RoleDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Contains CRUD functions for table 'Role'.
 */
class RoleController extends Controller
{
    /**
     * Validator for the table 'Role'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|unique:role,name',
            'description' => 'required',
        ],
            [
                'name.required' => 'name_required',
                'description.required' => 'description_required',
            ]);
    }


    /**
     * Returns a JSON array of all rows in table 'Role'.
     *
     * GET /roles
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
            'roles' => RoleDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'Role'.
     * Takes the id as a request parameter.
     *
     * GET /roles/roleId
     *
     * @param Request $request
     * @param integer $roleId
     * @return JsonResponse
     */
    public function get(Request $request, int $roleId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'role' => RoleDataService::get($roleId, $joinTables, $value)
        ], 200);
    }

    /**
     * Returns a JSON array of all rows in table 'Role' which match with the specified search parameters.
     *
     * GET /roles/search
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
            'roles' => RoleDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Role'.
     * Takes the item fields as request parameters.
     *
     * POST /roles
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
            $role = RoleDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'role' => $role
        ], 201);
    }

    /**
     * Updates an item in table 'Role'.
     * Takes the item fields as request parameters.
     *
     * PUT /roles/$roleId
     *
     * @param Request $request
     * @param integer $roleId
     * @return JsonResponse
     */
    public function update(Request $request, int $roleId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $role = RoleDataService::update($roleId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'role' => $role
        ], 200);
    }

    /**
     * Deletes an item in table 'Role'.
     * Takes the id as a request parameter.
     *
     * DELETE /roles/roleId
     *
     * @param Request $request
     * @param integer $roleId
     * @return JsonResponse
     */
    public function delete(Request $request, int $roleId)
    {
        RoleDataService::delete($roleId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

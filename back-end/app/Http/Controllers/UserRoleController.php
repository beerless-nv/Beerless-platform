<?php

namespace App\Http\Controllers;

use App\DataServices\UserRoleDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Contains CRUD functions for table 'UserRole'.
 */
class UserRoleController extends Controller
{
    /**
     * Validator for the table 'UserRole'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'userID' => 'required|numeric',
            'roleID' => 'required|numeric',
        ],
            [
                'userID.required' => 'user_required',
                'userID.numeric' => 'userID_not_numeric',
                'roleID.required' => 'role_required',
                'roleID.numeric' => 'roleID_not_numeric',
            ]);
    }


    /**
     * Returns a JSON array of all rows in table 'UserRole'.
     *
     * GET /userroles
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
            'userroles' => UserRoleDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'UserRole'.
     * Takes the id as a request parameter.
     *
     * GET /userroles/userroleId
     *
     * @param Request $request
     * @param integer $userroleId
     * @return JsonResponse
     */
    public function get(Request $request, int $userroleId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'userrole' => UserRoleDataService::get($userroleId, $joinTables, $value)
        ], 200);
    }

    /**
     * Returns a JSON array of all rows in table 'UserRole' which match with the specified search parameters.
     *
     * GET /userroles/search
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
            'userroles' => UserRoleDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'UserRole'.
     * Takes the item fields as request parameters.
     *
     * POST /userroles
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
            $userrole = UserRoleDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'userrole' => $userrole
        ], 201);
    }

    /**
     * Updates an item in table 'UserRole'.
     * Takes the item fields as request parameters.
     *
     * PUT /userroles/$userroleId
     *
     * @param Request $request
     * @param integer $userroleId
     * @return JsonResponse
     */
    public function update(Request $request, int $userroleId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $userrole = UserRoleDataService::update($userroleId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'userrole' => $userrole
        ], 200);
    }

    /**
     * Deletes an item in table 'UserRole'.
     * Takes the id as a request parameter.
     *
     * DELETE /userroles/userroleId
     *
     * @param Request $request
     * @param integer $userroleId
     * @return JsonResponse
     */
    public function delete(Request $request, int $userroleId)
    {
        UserRoleDataService::delete($userroleId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

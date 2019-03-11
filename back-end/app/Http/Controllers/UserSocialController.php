<?php
namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\DataServices\UserSocialDataService;
use Illuminate\Support\Facades\Validator;

class UserSocialController extends Controller
{
    /**
     * Validator for the table 'UserSocial'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data) {
        return Validator::make($data, [
            'userID' => 'required|numeric',
            'socialID' => 'required|numeric',
            'socialPlatform' => 'required',
            'picture' => 'required',
        ],
            [
                'userID.required' => 'user_required',
                'userID.numeric' => 'userID_not_numeric',
                'socialID.required' => 'socialID_required',
                'socialID.numeric' => 'socialID_not_numeric',
                'socialPlatform.required' => 'socialPlatform_required',
                'picture.required' => 'picture_required',
            ]);
    }




    /**
     * Returns a JSON array of all rows in table 'UserSocial'.
     *
     * GET /usersocials
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
            'usersocials' => UserSocialDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'UserSocial'.
     * Takes the id as a request parameter.
     *
     * GET /usersocials/usersocialId
     *
     * @param Request $request
     * @param integer $usersocialId
     * @return JsonResponse
     */
    public function get(Request $request, int $usersocialId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'usersocial' => UserSocialDataService::get($usersocialId, $joinTables, $value)
        ],200);
    }

    /**
     * Returns a JSON array of all rows in table 'UserSocial' which match with the specified search parameters.
     *
     * GET /usersocials/search
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
            'usersocials' => UserSocialDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'UserSocial'.
     * Takes the item fields as request parameters.
     *
     * POST /usersocials
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
            $usersocial = UserSocialDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'usersocial' => $usersocial
        ], 201);
    }

    /**
     * Updates an item in table 'UserSocial'.
     * Takes the item fields as request parameters.
     *
     * PUT /usersocials/$usersocialId
     *
     * @param Request $request
     * @param integer $usersocialId
     * @return JsonResponse
     */
    public function update(Request $request, int $usersocialId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $usersocial = UserSocialDataService::update($usersocialId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'usersocial' => $usersocial
        ], 200);
    }

    /**
     * Deletes an item in table 'UserSocial'.
     * Takes the id as a request parameter.
     *
     * DELETE /usersocials/$usersocialId
     *
     * @param Request $request
     * @param integer $usersocialId
     * @return JsonResponse
     */
    public function delete(Request $request, int $usersocialId)
    {
        UserSocialDataService::delete($usersocialId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

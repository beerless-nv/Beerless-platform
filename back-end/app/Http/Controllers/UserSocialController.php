<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DataServices\UserSocialDataService;
use Illuminate\Support\Facades\Validator;

class UserSocialController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'Usersocial'.
     *
     * GET /usersocials
     *
     * @param Request $request
     * @return Response
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
     * @return Response
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
     * Undocumented function
     *
     * GET /usersocials/search
     *
     * @param Request $request
     * @return Response
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
     * Requires the field 'name'.
     *
     * POST /usersocials
     *
     * @param Request $request
     * @return Response
     */
    public function insert(Request $request)
    {
        // Validate incoming requests
        $validator = Validator::make($request->all(), [
            'inputObject.userID' => 'required|numeric',
            'inputObject.socialID' => 'required|numeric',
            'inputObject.socialPlatform' => 'required',
            'inputObject.picture' => 'required',
        ],
            [
                'inputObject.userID.required' => 'user_required',
                'inputObject.userID.numeric' => 'userID_not_numeric',
                'inputObject.socialID.required' => 'socialID_required',
                'inputObject.socialID.numeric' => 'socialID_not_numeric',
                'inputObject.socialPlatform.required' => 'socialPlatform_required',
                'inputObject.picture.required' => 'picture_required',
            ]);

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
     * Requires the field 'name'.
     *
     * PATCH /usersocials/$usersocialId
     *
     * @param Request $request
     * @param integer $usersocialId
     * @return Response
     */
    public function patch(Request $request, int $usersocialId)
    {
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $usersocial = UserSocialDataService::update($usersocialId, $updateArray);
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
     * @return Response
     */
    public function delete(Request $request, int $usersocialId)
    {
        UserSocialDataService::delete($usersocialId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

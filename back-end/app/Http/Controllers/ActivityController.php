<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\DataServices\ActivityDataService;

/**
 * Contains CRUD functions for table 'Activity'.
 */
class ActivityController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'Activity'.
     * 
     * GET /activities
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
            'activities' => ActivityDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'Activity'.
     * Takes the id as a request parameter.
     * 
     * GET /activities/activityId
     * 
     * @param Request $activityId
     * @param integer $activityId
     * @return Reponse
     */
    public function get(Request $request, int $activityId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'activity' => ActivityDataService::get($activityId, $joinTables, $value)
        ],200);
    }

    /**
     * Undocumented function
     * 
     * GET /activities/search
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
            'activities' => ActivityDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Activity'.
     * Takes the item fields as request parameters.
     * Requires the field 'title'.
     *
     * POST /activities
     *
     * @param Request $request
     * @return Response
     */
    public function insert(Request $request)
    {
        // Validate incoming requests
        $validator = Validator::make($request->all(), [
            'inputObject.activityTypeID' => 'required|numeric',
            'inputObject.userID' => 'required|numeric',
        ],
            [
                'inputObject.activityTypeID.required' => 'activityType_required',
                'inputObject.activityTypeID.numeric' => 'activityTypeID_not_numeric',
                'inputObject.userID.required' => 'user_required',
                'inputObject.userID.numeric' => 'userID_not_numeric',
            ]);

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $activity = ActivityDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'activity' => $activity
        ], 201);
    }

    /**
     * Updates an item in table 'Activity'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     *
     * PATCH /activities/$activityId
     *
     * @param Request $request
     * @param integer $activityId
     * @return Response
     */
    public function patch(Request $request, int $activityId)
    {
        // Validate incoming requests
        $validator = Validator::make($request->all(), [
            'inputObject.activityTypeID' => 'required',
            'inputObject.userID' => 'required',
        ],
            [
                'inputObject.activityTypeID.required' => 'activityType_required',
                'inputObject.userID.required' => 'user_required',
            ]);

//        if ($validator->fails()) {
//            $retVal['msg'] = $validator->messages()->all();
//            return response()->json($retVal, 400);
//        } else {
//            foreach ($request->input('updateArray') as $item) {
//                $updateArray[$item['propName']] = $item['value'];
//            }
//            $activity = ActivityDataService::update($activityId, $updateArray);
//        }

        return response()->json([
            'success' => true,
            'activity' => $activity
        ], 200);
    }

    /**
     * Deletes an item in table 'Activity'.
     * Takes the id as a request parameter.
     * 
     * DELETE /activities/activityId
     *
     * @param Request $request
     * @param integer $activityId
     * @return Response
     */
    public function delete(Request $request, int $activityId)
    {
        ActivityDataService::delete($activityId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

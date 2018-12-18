<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
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
        
        return response()->json([
            'success' => true,
            'activities' => ActivityDataService::getAll($joinTables, $sortOrder, $limit, $offset)
        ], 200);
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
        $activity = '';
        if(isset($request->input('inputObject')['title'])){
            $activity = ActivityDataService::insert($request->input('inputObject'));
        } else{
            return response()->json([
                'success' => false,
                'msg' => 'title_required'
            ], 400);
        }
        
        return response()->json([
            'success' => true,
            'activity' => $activity
        ], 201);
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
        
        return response()->json([
            'success' => true,
            'activity' => ActivityDataService::get($activityId, $joinTables)
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

        return response()->json([
            "success" => true,
            'activities' => ActivityDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset)
        ]);
    }

    /**
     * Deletes an item in table 'Activity'.
     * Takes the id as a request parameter.
     * 
     * DELETE /activities/activityId
     *
     * @param Request $request
     * @param integer $activityId
     * @return void
     */
    public function delete(Request $request, int $activityId)
    {
        ActivityDataService::delete($activityId);
        return response()->json([
            'success' => true
        ], 204);
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
     * @return void
     */
    public function patch(Request $request, int $activityId)
    {
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $activity = ActivityDataService::update($activityId, $updateArray);
        return response()->json([
            'success' => true,
            'activity' => $activity
        ], 200);
    }
}

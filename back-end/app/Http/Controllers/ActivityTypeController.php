<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\DataServices\ActivityTypeDataService;

/**
 * Contains CRUD functions for table 'ActivityType'.
 */
class ActivityTypeController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'ActivityType'.
     * 
     * GET /activitytypes
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
            'activitytypes' => ActivityTypeDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'ActivityType'.
     * Takes the id as a request parameter.
     *
     * GET /activitytypes/activitytypeId
     *
     * @param Request $request
     * @param integer $activitytypeId
     * @return JsonResponse
     */
    public function get(Request $request, int $activitytypeId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'activitytype' => ActivityTypeDataService::get($activitytypeId, $joinTables, $value)
        ],200);
    }

    /**
     * Undocumented function
     *
     * GET /activitytypes/search
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
            'activitytypes' => ActivityTypeDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'ActivityType'.
     * Takes the item fields as request parameters.
     * Requires the field 'title'.
     * 
     * POST /activitytypes
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function insert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'inputObject.name' => 'required',
            'inputObject.points' => 'required',
        ],
            [
                'inputObject.name.required' => 'name_required',
                'inputObject.points.required' => 'points_required',
            ]);

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $activitytype = ActivityTypeDataService::insert($request->input('inputObject'));
        }
        
        return response()->json([
            'success' => true,
            'activitytype' => $activitytype
        ], 201);
    }

    /**
     * Updates an item in table 'ActivityType'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     *
     * PATCH /activitytypes/$activitytypeId
     *
     * @param Request $request
     * @param integer $activitytypeId
     * @return JsonResponse
     */
    public function patch(Request $request, int $activitytypeId)
    {
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $activitytype = ActivityTypeDataService::update($activitytypeId, $updateArray);
        return response()->json([
            'success' => true,
            'activitytype' => $activitytype
        ], 200);
    }

    /**
     * Deletes an item in table 'ActivityType'.
     * Takes the id as a request parameter.
     * 
     * DELETE /activitytypes/activitytypeId
     *
     * @param Request $request
     * @param integer $activitytypeId
     * @return JsonResponse
     */
    public function delete(Request $request, int $activitytypeId)
    {
        ActivityTypeDataService::delete($activitytypeId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

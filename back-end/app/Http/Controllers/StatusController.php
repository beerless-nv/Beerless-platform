<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\DataServices\StatusDataService;

/**
 * Contains CRUD functions for table 'Status'.
 */
class StatusController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'Status'.
     * 
     * GET /statuses
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
            'statuses' => StatusDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'Status'.
     * Takes the id as a request parameter.
     * 
     * GET /statuses/statusId
     * 
     * @param Request $request
     * @param integer $statusId
     * @return Reponse
     */
    public function get(Request $request, int $statusId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'status' => StatusDataService::get($statusId, $joinTables, $value)
        ],200);
    }

    /**
     * Undocumented function
     * 
     * GET /statuses/search
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
            'statuses' => StatusDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Status'.
     * Takes the item fields as request parameters.
     * Requires the field 'title'.
     *
     * POST /statuses
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function insert(Request $request)
    {
        // Validate incoming requests
        $validator = Validator::make($request->all(), [
            'inputObject.name' => 'required',
        ],
            [
                'inputObject.name.required' => 'name_required',
            ]);

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $status = StatusDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'status' => $status
        ], 201);
    }

    /**
     * Updates an item in table 'Status'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     *
     * PATCH /statuses/$statusId
     *
     * @param Request $request
     * @param integer $statusId
     * @return JsonResponse
     */
    public function patch(Request $request, int $statusId)
    {
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $status = StatusDataService::update($statusId, $updateArray);
        return response()->json([
            'success' => true,
            'status' => $status
        ], 200);
    }

    /**
     * Deletes an item in table 'Status'.
     * Takes the id as a request parameter.
     * 
     * DELETE /statuses/statusId
     *
     * @param Request $request
     * @param integer $statusId
     * @return JsonResponse
     */
    public function delete(Request $request, int $statusId)
    {
        StatusDataService::delete($statusId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Relationship;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\DataServices\RelationshipDataService;

/**
 * Contains CRUD functions for table 'Relationship'.
 */
class RelationshipController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'Relationship'.
     * 
     * GET /relationships
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
            'relationships' => RelationshipDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'Relationship'.
     * Takes the id as a request parameter.
     * 
     * GET /relationships/relationshipId
     * 
     * @param Request $request
     * @param integer $relationshipId
     * @return Reponse
     */
    public function get(Request $request, int $relationshipId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'relationship' => RelationshipDataService::get($relationshipId, $joinTables, $value)
        ],200);
    }

    /**
     * Undocumented function
     * 
     * GET /relationships/search
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
            'success' => true,
            'relationships' => RelationshipDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Relationship'.
     * Takes the item fields as request parameters.
     * Requires the field 'title'.
     *
     * POST /relationships
     *
     * @param Request $request
     * @return Response
     */
    public function insert(Request $request)
    {
        // Validate incoming requests
        $validator = Validator::make($request->all(), [
            'inputObject.user_1ID' => 'required|numeric',
            'inputObject.user_2ID' => 'required|numeric',
            'inputObject.actionUserID' => 'required|numeric',
            'inputObject.statusID' => 'required|numeric|min:1|max:4',
        ],
            [
                'inputObject.user_1ID.required' => 'user_1_required',
                'inputObject.user_1ID.numeric' => 'user_1ID_not_numeric',
                'inputObject.user_2ID.required' => 'user_2_required',
                'inputObject.user_2ID.numeric' => 'user_2ID_not_numeric',
                'inputObject.actionUserID.required' => 'actionUser_required',
                'inputObject.actionUserID.numeric' => 'actionUserID_not_numeric',
                'inputObject.statusID.required' => 'status_required',
                'inputObject.statusID.numeric' => 'statusID_not_numeric',
                'inputObject.statusID.min' => 'statusID_less_than_1',
                'inputObject.statusID.max' => 'statusID_greater_than_4',
            ]);

        $relationCheck1 = Relationship::where('user_1ID', $request->input('inputObject')['user_1ID'])
            ->where('user_2ID', $request->input('inputObject')['user_2ID'])
            ->where('statusID', '!=', 1)
            ->where('statusID', '!=', 2)
            ->where('statusID', '!=', 4)
            ->exists();
        $relationCheck2 = Relationship::where('user_1ID', $request->input('inputObject')['user_2ID'])
            ->where('user_1ID', $request->input('inputObject')['user_2ID'])
            ->where('statusID', '!=', 1)
            ->where('statusID', '!=', 2)
            ->where('statusID', '!=', 4)
            ->exists();

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else if ($relationCheck1 != null  || $relationCheck2 != null) {
            // if relation doesn't exist or is declined
            $relationship = RelationshipDataService::insert($request->input('inputObject'));
        } else {
            $retVal['msg'] = array('relationship_request_not_possible');
            return response()->json($retVal, 400);
        }

        return response()->json([
            'success' => true,
            'relationship' => $relationship
        ], 201);
    }

    /**
     * Updates an item in table 'Relationship'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     *
     * PATCH /relationships/$relationshipId
     *
     * @param Request $request
     * @param integer $relationshipId
     * @return Response
     */
    public function patch(Request $request, int $relationshipId)
    {
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $relationship = RelationshipDataService::update($relationshipId, $updateArray);
        return response()->json([
            'success' => true,
            'relationship' => $relationship
        ], 200);
    }

    /**
     * Deletes an item in table 'Relationship'.
     * Takes the id as a request parameter.
     * 
     * DELETE /relationships/relationshipId
     *
     * @param Request $request
     * @param integer $relationshipId
     * @return Response
     */
    public function delete(Request $request, int $relationshipId)
    {
        RelationshipDataService::delete($relationshipId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

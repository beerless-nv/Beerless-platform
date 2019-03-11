<?php

namespace App\Http\Controllers;

use App\Models\Relationship;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\DataServices\RelationshipDataService;

/**
 * Contains CRUD functions for table 'Relationship'.
 */
class RelationshipController extends Controller
{
    /**
     * Validator for the table 'Activity'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data) {
        return Validator::make($data, [
            'user_1ID' => 'required|numeric',
            'user_2ID' => 'required|numeric',
            'actionUserID' => 'required|numeric',
            'statusID' => 'required|numeric|min:1|max:4',
        ],
            [
                'user_1ID.required' => 'user_1_required',
                'user_1ID.numeric' => 'user_1ID_not_numeric',
                'user_2ID.required' => 'user_2_required',
                'user_2ID.numeric' => 'user_2ID_not_numeric',
                'actionUserID.required' => 'actionUser_required',
                'actionUserID.numeric' => 'actionUserID_not_numeric',
                'statusID.required' => 'status_required',
                'statusID.numeric' => 'statusID_not_numeric',
                'statusID.min' => 'statusID_less_than_1',
                'statusID.max' => 'statusID_greater_than_4',
            ]);
    }




    /**
     * Returns a JSON array of all rows in table 'Relationship'.
     * 
     * GET /relationships
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
     * Returns a JSON array of all rows in table 'Activity' which match with the specified search parameters.
     * 
     * GET /relationships/search
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
            'success' => true,
            'relationships' => RelationshipDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Relationship'.
     * Takes the item fields as request parameters.
     *
     * POST /relationships
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function insert(Request $request)
    {
        $validator = $this->validator($request->input('inputObject'));

        $relationCheck1 = Relationship::where('user_1ID', $request->input('inputObject')['user_1ID'])
            ->where('user_2ID', $request->input('inputObject')['user_2ID'])
            ->where('statusID', '!=', 1)
            ->where('statusID', '!=', 2)
            ->where('statusID', '!=', 4)
            ->exists();
        $relationCheck2 = Relationship::where('user_1ID', $request->input('inputObject')['user_2ID'])
            ->where('user_2ID', $request->input('inputObject')['user_1ID'])
            ->where('statusID', '!=', 1)
            ->where('statusID', '!=', 2)
            ->where('statusID', '!=', 4)
            ->exists();

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else if ($relationCheck1 == null  && $relationCheck2 == null) {
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
     *
     * PUT /relationships/$relationshipId
     *
     * @param Request $request
     * @param integer $relationshipId
     * @return JsonResponse
     */
    public function update(Request $request, int $relationshipId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $relationship = RelationshipDataService::update($relationshipId, $request->input('updateObject'));
        }

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
     * @return JsonResponse
     */
    public function delete(Request $request, int $relationshipId)
    {
        RelationshipDataService::delete($relationshipId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

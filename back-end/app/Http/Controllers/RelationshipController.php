<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
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
            "success" => true,
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
        $relationship = '';
        if(isset($request->input('inputObject')['title'])){
            $relationship = RelationshipDataService::insert($request->input('inputObject'));
        } else{
            return response()->json([
                'success' => false,
                'msg' => 'title_required'
            ], 400);
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

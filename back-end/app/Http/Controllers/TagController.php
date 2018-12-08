<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\DataServices\TagDataService;

/**
 * Contains CRUD functions for table 'Tag'.
 */
class TagController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'Tag'.
     * 
     * GET /tags
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
            'tags' => TagDataService::getAll($joinTables, $sortOrder, $limit, $offset)
        ], 200);
    }

    /**
     * Insert an item into table 'Tag'.
     * Takes the item fields as request parameters.
     * Requires the field 'title'.
     * 
     * POST /tags
     *
     * @param Request $request
     * @return Response
     */
    public function insert(Request $request)
    {
        $tag = '';
        if(isset($request->input('inputObject')['name'])){
            $tag = TagDataService::insert($request->input('inputObject'));
        } else{
            return response()->json([
                'success' => false,
                'msg' => 'name_required'
            ], 400);
        }
        
        return response()->json([
            'success' => true,
            'tag' => $tag
        ], 201);
    }


    /**
     * Returns a specific JSON object of type 'Tag'.
     * Takes the id as a request parameter.
     * 
     * GET /tags/tagId
     * 
     * @param Request
     * @param integer $tagId
     * @return Reponse
     */
    public function get(Request $request, int $tagId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));
        
        return response()->json([
            'success' => true,
            'tag' => TagDataService::get($tagId, $joinTables)
        ],200);
    }

    /**
     * Undocumented function
     * 
     * GET /tags/search
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
            'tags' => TagDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset)
        ]);
    }

    /**
     * Deletes an item in table 'Tag'.
     * Takes the id as a request parameter.
     * 
     * DELETE /tags/tagId
     *
     * @param Request $request
     * @param integer $tagId
     * @return void
     */
    public function delete(Request $request, int $tagId)
    {
        TagDataService::delete($tagId);
        return response()->json([
            'success' => true
        ], 204);
    }

    /**
     * Updates an item in table 'Tag'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     * 
     * PATCH /tags/$tagId
     *
     * @param Request $request
     * @param integer $tagId
     * @return void
     */
    public function patch(Request $request, int $tagId)
    {
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $tag = TagDataService::update($tagId, $updateArray);
        return response()->json([
            'success' => true,
            'tag' => $tag
        ], 200);
    }
}

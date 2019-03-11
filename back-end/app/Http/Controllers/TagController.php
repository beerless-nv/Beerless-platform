<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\DataServices\TagDataService;

/**
 * Contains CRUD functions for table 'Tag'.
 */
class TagController extends Controller
{
    /**
     * Validator for the table 'Tag'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data) {
        return Validator::make($data, [
            'name' => 'required',
        ],
            [
                'name.required' => 'name_required',
            ]);
    }




    /**
     * Returns a JSON array of all rows in table 'Tag'.
     * 
     * GET /tags
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
            'tags' => TagDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
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

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'tag' => TagDataService::get($tagId, $joinTables, $value)
        ],200);
    }

    /**
     * Returns a JSON array of all rows in table 'Tag' which match with the specified search parameters.
     * 
     * GET /tags/search
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
            'tags' => TagDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Tag'.
     * Takes the item fields as request parameters.
     *
     * POST /tags
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
            $tag = TagDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'tag' => $tag
        ], 201);
    }

    /**
     * Updates an item in table 'Tag'.
     * Takes the item fields as request parameters.
     *
     * PUT /tags/$tagId
     *
     * @param Request $request
     * @param integer $tagId
     * @return JsonResponse
     */
    public function update(Request $request, int $tagId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $tag = TagDataService::update($tagId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'tag' => $tag
        ], 200);
    }

    /**
     * Deletes an item in table 'Tag'.
     * Takes the id as a request parameter.
     * 
     * DELETE /tags/tagId
     *
     * @param Request $request
     * @param integer $tagId
     * @return JsonResponse
     */
    public function delete(Request $request, int $tagId)
    {
        TagDataService::delete($tagId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

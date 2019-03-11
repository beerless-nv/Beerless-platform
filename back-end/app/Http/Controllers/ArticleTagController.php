<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\DataServices\ArticleTagDataService;

/**
 * Contains CRUD functions for table 'ArticleTag'.
 */
class ArticleTagController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'ArticleTag'.
     * 
     * GET /articletags
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
            'articletags' => ArticleTagDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }


    /**
     * Returns a specific JSON object of type 'ArticleTag'.
     * Takes the id as a request parameter.
     * 
     * GET /articletags/articletagId
     * 
     * @param Request $request
     * @param integer $articletagId
     * @return Reponse
     */
    public function get(Request $request, int $articletagId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'articletag' => ArticleTagDataService::get($articletagId, $joinTables, $value)
        ],200);
    }

    /**
     * Undocumented function
     * 
     * GET /articletags/search
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
            'articletags' => ArticleTagDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'ArticleTag'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     *
     * POST /articletags
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function insert(Request $request)
    {
        // Validate incoming requests
        $validator = Validator::make($request->all(), [
            'inputObject.articleID' => 'required|numeric',
            'inputObject.tagID' => 'required|numeric',
        ],
            [
                'inputObject.articleID.required' => 'article_required',
                'inputObject.articleID.numeric' => 'articleID_not_numeric',
                'inputObject.tagID.required' => 'tag_required',
                'inputObject.tagID.numeric' => 'tagID_not_numeric',
            ]);

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $articletag = ArticleTagDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'articletag' => $articletag
        ], 201);
    }

    /**
     * Updates an item in table 'ArticleTag'.
     * Takes the item fields as request parameters.
     * Requires the field 'id' and 'name'.
     *
     * PATCH /articletags/$articletagId
     *
     * @param Request $request
     * @param integer $articletagId
     * @return JsonResponse
     */
    public function patch(Request $request, int $articletagId)
    {
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $articletag = ArticleTagDataService::update($articletagId, $updateArray);
        return response()->json([
            'success' => true,
            'articletag' => $articletag
        ], 200);
    }

    /**
     * Deletes an item in table 'ArticleTag'.
     * Takes the id as a request parameter.
     * 
     * DELETE /articletags/articletagId
     *
     * @param Request $request
     * @param integer $articletagId
     * @return JsonResponse
     */
    public function delete(Request $request, int $articletagId)
    {
        ArticleTagDataService::delete($articletagId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\DataServices\ArticleDataService;

/**
 * Contains CRUD functions for table 'Article'.
 */
class ArticleController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'Article'.
     * 
     * GET /articles
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
            'articles' => ArticleDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'Article'.
     * Takes the id as a request parameter.
     *
     * GET /articles/articleId
     *
     * @param Request $articleId
     * @param integer $articleId
     * @return Reponse
     */
    public function get(Request $request, int $articleId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'article' => ArticleDataService::get($articleId, $joinTables, $value)
        ],200);
    }

    /**
     * Undocumented function
     *
     * GET /articles/search
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
            'articles' => ArticleDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Article'.
     * Takes the item fields as request parameters.
     * Requires the field 'title'.
     * 
     * POST /articles
     *
     * @param Request $request
     * @return Response
     */
    public function insert(Request $request)
    {
        $article = '';
        if(isset($request->input('inputObject')['title'])){
            $article = ArticleDataService::insert($request->input('inputObject'));
        } else{
            return response()->json([
                'success' => false,
                'msg' => 'title_required'
            ], 400);
        }
        
        return response()->json([
            'success' => true,
            'article' => $article
        ], 201);
    }

    /**
     * Updates an item in table 'Article'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     *
     * PATCH /articles/$articleId
     *
     * @param Request $request
     * @param integer $articleId
     * @return Response
     */
    public function patch(Request $request, int $articleId)
    {
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $article = ArticleDataService::update($articleId, $updateArray);
        return response()->json([
            'success' => true,
            'article' => $article
        ], 200);
    }

    /**
     * Deletes an item in table 'Article'.
     * Takes the id as a request parameter.
     * 
     * DELETE /articles/articleId
     *
     * @param Request $request
     * @param integer $articleId
     * @return Response
     */
    public function delete(Request $request, int $articleId)
    {
        ArticleDataService::delete($articleId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

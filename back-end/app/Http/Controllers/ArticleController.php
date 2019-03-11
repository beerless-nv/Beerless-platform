<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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
     * @return JsonResponse
     */
    public function insert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'inputObject.title' => 'required|unique:article,title',
            'inputObject.slug' => 'required|unique:article,slug',
            'inputObject.picture' => 'required',
            'inputObject.intro' => 'required',
            'inputObject.content' => 'required',
            'inputObject.userID' => 'required|numeric',
        ],
            [
                'inputObject.title.required' => 'title_required',
                'inputObject.title.unique' => 'title_not_unique',
                'inputObject.slug.required' => 'slug_required',
                'inputObject.slug.unique' => 'slug_not_unique',
                'inputObject.picture.required' => 'picture_required',
                'inputObject.intro.required' => 'intro_required',
                'inputObject.content.required' => 'content_required',
                'inputObject.userID.required' => 'user_required',
                'inputObject.userID.numeric' => 'userID_required',
            ]);

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $article = ArticleDataService::insert($request->input('inputObject'));
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
     * @return JsonResponse
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
     * @return JsonResponse
     */
    public function delete(Request $request, int $articleId)
    {
        ArticleDataService::delete($articleId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
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
     * @return Response
     */
    public function getAll(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if($orderBy != null){$sortOrder[$orderBy[0]] = $orderBy[1];} 
        else {$sortOrder = null;}
        
        return response()->json([
            'success' => true,
            'articletags' => ArticleTagDataService::getAll($joinTables, $sortOrder)
        ], 200);
    }

    /**
     * Insert an item into table 'ArticleTag'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     * 
     * POST /articletags
     *
     * @param Request $request
     * @return void
     */
    public function insert(Request $request)
    {
        $articletag = '';
        if(isset($request->input('inputObject')['articleID']) && isset($request->input('inputObject')['tagID'])){
            $articletag = ArticleTagDataService::insert($request->input('inputObject'));
        } else{
            return response()->json([
                'success' => false,
                'msg' => 'all_fields_required'
            ], 400);
        }
        
        return response()->json([
            'success' => true,
            'articletag' => $articletag
        ], 201);
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
        
        return response()->json([
            'success' => true,
            'articletag' => ArticleTagDataService::get($articletagId, $joinTables)
        ],200);
    }

    /**
     * Undocumented function
     * 
     * GET /articletags/search
     *
     * @param Request $request
     * @return void
     */
    public function search(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if($orderBy != null){$sortOrder[$orderBy[0]] = $orderBy[1];} 
        else {$sortOrder = null;}

        return response()->json([
            "success" => true,
            'articletags' => ArticleTagDataService::search($request->input('searchParams'), $joinTables, $sortOrder)
        ]);
    }

    /**
     * Deletes an item in table 'ArticleTag'.
     * Takes the id as a request parameter.
     * 
     * DELETE /articletags/articletagId
     *
     * @param Request $request
     * @param integer $articletagId
     * @return void
     */
    public function delete(Request $request, int $articletagId)
    {
        ArticleTagDataService::delete($articletagId);
        return response()->json([
            'success' => true
        ], 204);
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
     * @return void
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
}

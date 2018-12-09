<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DataServices\UserSocialDataService;

class UserSocialController extends Controller
{
    /**
     * Insert an item into table 'UserSocial'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     *
     * POST /usersocials
     *
     * @param Request $request
     * @return Response
     */
    public function insert(Request $request)
    {
        $usersocial = '';
        if(isset($request->input('inputObject')['userID']) && isset($request->input('inputObject')['socialID']) && isset($request->input('inputObject')['socialPlatform']) && isset($request->input('inputObject')['picture'])){
            $usersocial = UserSocialDataService::insert($request->input('inputObject'));
        } else{
            return response()->json([
                'success' => false,
                'msg' => 'all_fields_required'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'usersocial' => $usersocial
        ], 201);
    }


    /**
     * Returns a specific JSON object of type 'UserSocial'.
     * Takes the id as a request parameter.
     *
     * GET /usersocials/usersocialId
     *
     * @param Request $request
     * @param integer $usersocialId
     * @return Response
     */
    public function get(Request $request, int $usersocialId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        return response()->json([
            'success' => true,
            'usersocial' => UserSocialDataService::get($usersocialId, $joinTables)
        ],200);
    }

    /**
     * Undocumented function
     *
     * GET /usersocials/search
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

        return response()->json([
            "success" => true,
            'usersocials' => UserSocialDataService::search($request->input('searchParams'), $joinTables, $sortOrder)
        ]);
    }
}
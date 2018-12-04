<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\Models\Beer;
use App\DataServices\BeerDataService;

/**
 * Contains CRUD functions for table 'Beer'.
 */
class BeerController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'Beer'.
     * 
     * GET /beers
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
            'beers' => BeerDataService::getAll($joinTables, $sortOrder)
        ], 200);
    }

    /**
     * Insert an item into table 'Beer'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     * 
     * POST /beers
     *
     * @param Request $request
     * @return void
     */
    public function insert(Request $request)
    {
        $beer;
        if(isset($request->input('inputArray')['name'])){
            $beer = BeerDataService::insert($request->input('inputArray'));
        } else{
            return response()->json([
                'success' => false,
                'msg' => 'name_required'
            ], 400);
        }
        
        return response()->json([
            'success' => true,
            'beer' => $beer
        ], 201);
    }


    /**
     * Returns a specific JSON object of type 'Beer'.
     * Takes the id as a request parameter.
     * 
     * GET /beers/beerId
     * 
     * @param Request $request
     * @param integer $beerId
     * @return Reponse
     */
    public function get(Request $request, int $beerId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));
        
        return response()->json([
            'success' => true,
            'beer' => BeerDataService::get($beerId, $joinTables)
        ],200);
    }

    /**
     * Undocumented function
     * 
     * GET /beers/search
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
            'beers' => BeerDataService::search($request->input('searchParams'), $joinTables, $sortOrder)
        ]);
    }

    /**
     * Deletes an item in table 'Beer'.
     * Takes the id as a request parameter.
     * 
     * DELETE /beers/beerId
     *
     * @param Request $request
     * @param integer $beerId
     * @return void
     */
    public function delete(Request $request, int $beerId)
    {
        BeerDataService::delete($beerId);
        return response()->json([
            'success' => true
        ], 204);
    }

    /**
     * Updates an item in table 'Beer'.
     * Takes the item fields as request parameters.
     * Requires the field 'id' and 'name'.
     * 
     * PATCH /beers/$beerId
     *
     * @param Request $request
     * @param integer $beerId
     * @return void
     */
    public function patch(Request $request, int $beerId)
    {
        $updateArray = array();
        foreach ($request->input('updateArray') as $item) {
            $updateArray[$item['propName']] = $item['value'];
        }
        $beer = BeerDataService::update($beerId, $updateArray);
        return response()->json([
            'success' => true,
            'beer' => $beer
        ], 200);
    }


    /**
     * Undocumented function
     *
     * @return Response
     */
    public function getNewest()
    {
        return response()->json(Beer::with('Brewery')->latest('timestampCreated')->take(5)->get());
    }

    /**
     * Loads image to server
     *
     * @param Request $request
     */
    public function uploadImage(Request $request)
    {
        $image = $request->file('image');
        $imageName = "/beer/" . $request->input('imagePath') . $request->input('imageName');

        if ($image) {
            Storage::disk('ftp')->put($imageName, File::get($image));
        }
    }

    /**
     * Returns a specific JSON object or a JSON array of type 'Beer'.
     * Takes the name as a request parameter.
     *
     * @param Request $request
     * @return Response
     */
    public function getByName(Request $request)
    {
        $name = $request->input("name");
        if ($name) {
            return response()->json(Beer::whereRaw("LOWER(Beer.name) Like ?", ['%' . strtolower($name) . '%'])
                ->with('Brewery')
                ->with('Beertype')
                ->get());
        }
    }
}

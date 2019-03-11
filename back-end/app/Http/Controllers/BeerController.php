<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Beer;
use App\DataServices\BeerDataService;
use Illuminate\Support\Facades\Validator;

/**
 * Contains CRUD functions for table 'Beer'.
 */
class BeerController extends Controller
{
    /**
     * Validator for the table 'Beer'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data) {
        return Validator::make($data, [
            'name' => 'required|unique:beer,name',
            'ABV' => 'required|numeric',
            'IBU' => 'required|numeric',
            'EBC' => 'numeric',
            'temperature' => 'numeric',
            'fermentation' => 'required',
            'logo' => 'required',
            'description' => 'required',
            'since' => 'required|numeric|digits:4',
            'beertypeID' => 'required|numeric',
        ],
            [
                'name.required' => 'name_required',
                'name.unique' => 'name_not_unique',
                'ABV.required' => 'ABV_required',
                'ABV.numeric' => 'ABV_not_numeric',
                'IBU.required' => 'IBU_required',
                'IBU.numeric' => 'IBU_not_numeric',
                'EBC.numeric' => 'EBC_not_numeric',
                'temperature.numeric' => 'temperature_not_numeric',
                'fermentation.required' => 'fermentation_required',
                'logo.required' => 'logo_required',
                'description.required' => 'description_required',
                'since.required' => 'since_required',
                'since.numeric' => 'since_not_numeric',
                'since.digits' => 'since_not_4_digits',
                'beertypeID.required' => 'beertype_required',
                'beertypeID.numeric' => 'beertypeID_not_numeric',
            ]);
    }




    /**
     * Returns a JSON array of all rows in table 'Beer'.
     * 
     * GET /beers
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
            'beers' => BeerDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
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

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));
        
        return response()->json([
            'success' => true,
            'beer' => BeerDataService::get($beerId, $joinTables, $value)
        ],200);
    }

    /**
     * Returns a JSON array of all records from table 'Beer' that match with the given parameters.
     * Requires the searchParams Array.
     * 
     * POST /beers/search
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
            'beers' => BeerDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Beer'.
     * Takes the item fields as request parameters.
     *
     * POST /beers
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
            $beer = BeerDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'beer' => $beer
        ], 201);
    }

    /**
     * Updates an entry in the table 'Beer'.
     *
     * PUT /beers/beerId
     *
     * @param Request $request
     * @param integer $beerId
     * @return JsonResponse
     */
    public function update(Request $request, int $beerId)
    {
        $validator = $this->validator($request->input('updateObject'));

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $beer = BeerDataService::update($beerId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'beer' => $beer
        ], 200);
    }

    /**
     * Deletes an item in table 'Beer'.
     * Takes the id as a request parameter.
     * 
     * DELETE /beers/beerId
     *
     * @param Request $request
     * @param integer $beerId
     * @return JsonResponse
     */
    public function delete(Request $request, int $beerId)
    {
        BeerDataService::delete($beerId);
        return response()->json([
            'success' => true
        ], 204);
    }

    /**
     * Undocumented function
     *
     * @return JsonResponse
     */
    public function getNewest()
    {
        $newestBeers = Beer::with('Brewery')->latest('timestampCreated')->take(5)->get();

        return response()->json([
            'success' => true,
            'beers' => $newestBeers
        ],200);
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
     * @return JsonResponse
     */
    public function getByName(Request $request)
    {
        $name = $request->input("name");
        if ($name) {
            return response()->json(Beer::whereRaw("LOWER(Beer.name) Like ?", ['%' . strtolower($name) . '%'])
                ->with('Brewery')
                ->with('Beerstyle')
                ->get());
        }
    }
}

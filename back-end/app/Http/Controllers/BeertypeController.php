<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Beertype;
use App\DataServices\BeertypeDataService;

class BeertypeController extends Controller
{
    /**
     * returns a JSON array of all columns in table 'Beertype'
     *
     * @uses App\Models\Beertype
     * @return Reponse
     */
    public function getAll()
    {
        return response()->json([
            'success' => true,
            'breweries' => BeertypeDataService::getAll()
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'Beertype'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @uses App\Models\Beertype
     * @return Response
     */
    public function get(Request $request, int $beertypeId)
    {
        return response()->json([
            'success' => true,
            'brewery' => BeertypeDataService::get($beertypeId)
        ],200);
    }

    
}

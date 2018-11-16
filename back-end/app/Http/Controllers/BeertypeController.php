<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Beertype;

class BeertypeController extends Controller
{
    /**
     * Returns a specific JSON object of type 'Beertype'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @uses App\Models\Beertype
     * @return Response
     */
    public function get(Request $request)
    {
        $id = $request->input('id');
        if ($id) {
            if (Beertype::where('ID', $id)->exists()) {
                return Beertype::where('ID', $id)->first();
            } else {
                return "false";
            }
        } else {
            return "false";
        }
    }

    /**
     * returns a JSON array of all columns in table 'Beertype'
     *
     * @uses App\Models\Beertype
     * @return Reponse
     */
    public function getAll()
    {
        return response()->json(Beertype::get());
    }
}

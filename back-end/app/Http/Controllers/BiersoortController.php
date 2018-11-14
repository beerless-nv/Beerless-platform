<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Biersoort;

class BiersoortController extends BaseController
{
    /**
     * Returns a specific JSON object of type 'Biersoort'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @uses App\Models\Biersoort
     * @return Response
     */
    public function get(Request $request)
    {
        $id = $request->input('id');
        if ($id) {
            if (Biersoort::where('ID', $id)->exists()) {
                return Biersoort::where('ID', $id)->first();
            } else {
                return "false";
            }
        } else {
            return "false";
        }
    }

    /**
     * returns a JSON array of all columns in table 'Bier'
     *
     * @uses App\Models\Biersoort
     * @return Reponse
     */
    public function getAll()
    {
        return response()->json(Biersoort::get());
    }
}

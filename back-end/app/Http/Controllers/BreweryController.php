<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Brewery;

/**
 * Contains CRUD functions for table 'Brewery'.
 */
class BreweryController extends Controller
{
    /**
     * Returns a specific JSON object of type 'Brewery'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return Response
     */
    public function get(Request $request)
    {
        $id = $request->input('id');
        if ($id && Brewery::where('ID', $id)->exists()) {
            return response()->json(Brewery::where('ID', $id)->first());
        } else {
            return "false";
        }
    }

    /**
     * Returns a specific JSON object or a JSON array of type 'Brewery'.
     * Takes the name as a request parameter.
     *
     * @param Request $request
     * @return Response
     */
    public function getByName(Request $request)
    {
        $name = $request->input("name");
        if ($name) {
            return response()->json(Brewery::whereRaw("LOWER(Brwery.name) Like ?", ['%' . strtolower($name) . '%'])->get());
        }
    }

    /**
     * Returns a JSON array of all columns in table 'Brewery'.
     *
     * @uses App\Models\Brewery
     * @return Response
     */
    public function getAll()
    {
        return response()->json(Brewery::get());
    }

    /**
     * Returns a JSON array of all records from table 'Brewery' with columns 'id' and 'name'.
     *
     * @return Response
     */
    public function getAllNameId()
    {
        return response()->json(Brewery::select('id', 'name')->get());
    }

    /**
     * Insert an item into table 'Brewery'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     *
     * @param Request $request
     * @return response
     */
    public function insert(Request $request)
    {
        $name = $request->input('name');
        if ($name) {
            $brewery = new Brewery([
                'description' => $request->input('description'),
                'country' => $request->input('country'),
                'place' => $request->input('place'),
                'postcode' => $request->input('postcode'),
                'streetAndNumber' => $request->input('streetAndNumber'),
                'logo' => $request->input('logo'),
                'province' => $request->input('province'),
                'beerAmount' => $request->input('beerAmount'),
                'contactID' => $request->input('contactID')
            ]);


            $brewery->save();
        } else {
            return "false";
        }
        return $request;
    }

    /**
     * Deletes an item in table 'Brewery'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return void
     */
    public function delete(Request $request)
    {
        $id = $request->input('id');
        if ($id && Brewery::where('ID', $id)->exists()) {
            $brouwerij = Brewery::find($id);
            $brouwerij->delete();
        } else {
            return "false";
        }
    }

    /**
     * Updates an item in table 'Brewery'.
     * Takes the item fields as request parameters.
     * Requires the field 'id' and 'name'.
     *
     * @param Request $request
     * @return Response
     */
    public function update(Request $request)
    {
        $id = $request->input('id');
        $naam = $request->input('name');
        if ($naam && $id) {
            $brewery = Brewery::find($id);

            $brewery->name = $name;
            $brewery->description = $request->input('description');
            $brewery->country = $request->input('country');
            $brewery->province = $request->input('province');
            $brewery->place = $request->input('place');
            $brewery->postcode = $request->input('postcode');
            $brewery->streetAndNumber = $request->input('streetAndNumber');
            $brewery->logo = $request->input('logo');
            $brewery->beerAmount = $request->input('beerAmount');
            $brewery->contactID = $request->input('contactID');
            $brewery->save();
        } else {
            return "false";
        }
    }
}

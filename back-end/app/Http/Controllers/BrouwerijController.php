<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Brouwerij;

/**
 * Contains CRUD functions for table 'Brouwerij'.
 */
class BrouwerijController extends BaseController
{
    /**
     * Returns a specific JSON object of type 'Brouwerij'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return Response
     */
    public function get(Request $request)
    {
        $id = $request->input('id');
        if ($id && Brouwerij::where('ID', $id)->exists()) {
            return response()->json(Brouwerij::where('ID', $id)->first());
        } else {
            return "false";
        }
    }

    /**
     * Returns a specific JSON object or a JSON array of type 'Bier'.
     * Takes the name as a request parameter.
     *
     * @param Request $request
     * @return Response
     */
    public function getByNaam(Request $request)
    {
        $naam = $request->input("naam");
        if ($naam) {
            return response()->json(Brouwerij::whereRaw("LOWER(Brouwerij.naam) Like ?", ['%' . strtolower($naam) . '%'])->get());
        }
    }

    /**
     * Returns a JSON array of all columns in table 'Brouwerij'.
     *
     * @uses App\Models\Brouwerij
     * @return Response
     */
    public function getAll()
    {
        return response()->json(Brouwerij::get());
    }

    /**
     * Returns a JSON array of all records from table 'Brouwerij' with columns 'id' and 'naam'?
     *
     * @return Response
     */
    public function getAllNaamId()
    {
        return response()->json(Brouwerij::select('id', 'naam')->get());
    }

    /**
     * Insert an item into table 'Brouwerij'.
     * Takes the item fields as request parameters.
     * Requires the field 'naam'.
     *
     * @param Request $request
     * @return response
     */
    public function insert(Request $request)
    {
        $naam = $request->input('naam');
        if ($naam) {
            $brouwerij = new Brouwerij;

            $brouwerij->naam = $naam;
            $brouwerij->beschrijving = $request->input('beschrijving');
            $brouwerij->land = $request->input('land');
            $brouwerij->provincie = $request->input('provincie');
            $brouwerij->plaats = $request->input('plaats');
            $brouwerij->postcode = $request->input('postcode');
            $brouwerij->straatEnNummer = $request->input('straatEnNummer');
            $brouwerij->logo = $request->input('logo');
            $brouwerij->aantalBieren = $request->input('aantalBieren');
            $brouwerij->contactID = $request->input('contactID');

            $brouwerij->save();
        } else {
            return "false";
        }
        return $request;
    }

    /**
     * Deletes an item in table 'Brouwerij'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return void
     */
    public function delete(Request $request)
    {
        $id = $request->input('id');
        if ($id && Brouwerij::where('ID', $id)->exists()) {
            $brouwerij = Brouwerij::find($id);
            $brouwerij->delete();
        } else {
            return "false";
        }
    }

    /**
     * Updates an item in table 'Brouwerij'.
     * Takes the item fields as request parameters.
     * Requires the field 'id' and 'naam'.
     *
     * @param Request $request
     * @return Response
     */
    public function update(Request $request)
    {
        $id = $request->input('id');
        $naam = $request->input('naam');
        if ($naam && $id) {
            $brouwerij = Brouwerij::find($id);

            $brouwerij->naam = $naam;
            $brouwerij->beschrijving = $request->input('beschrijving');
            $brouwerij->land = $request->input('land');
            $brouwerij->provincie = $request->input('provincie');
            $brouwerij->plaats = $request->input('plaats');
            $brouwerij->postcode = $request->input('postcode');
            $brouwerij->straatEnNummer = $request->input('straatEnNummer');
            $brouwerij->logo = $request->input('logo');
            $brouwerij->aantalBieren = $request->input('aantalBieren');
            $brouwerij->contactID = $request->input('contactID');
            $brouwerij->save();
        } else {
            return "false";
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Bier;

/**
 * Contains CRUD functions for table 'Bier'.
 */
class BierController extends Controller
{
    /**
     * Returns a specific JSON object of type 'Bier'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return Response
     */
    public function get(Request $request)
    {
        $id = $request->input('id');
        if ($id && Bier::where('ID', $id)->exists()) {
            return Bier::where('ID', $id)->first();
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
            return response()->json(Bier::whereRaw("LOWER(Bier.naam) Like ?", ['%' . strtolower($naam) . '%'])
                ->with('Brouwerij')
                ->with('Biersoort')
                ->get());
        }
    }

    public function getNewest()
    {
        return response()->json(Bier::with('Brouwerij')->latest('timestampCreated')->take(5)->get());
    }

    /**
     * Returns a JSON array of all rows in table 'Bier'
     *
     * @return Reponse
     */
    public function getAll()
    {
        return response()->json(Bier::with('Biersoort')->with('Brouwerij')->get());
    }

    /**
     * Loads image to server
     *
     * @param Request $request
     */

    public function uploadImage(Request $request)
    {
        $image = $request->file('afbeelding');
        $imageName = "/bier/" . $request->input('afbeeldingPad') . $request->input('afbeeldingNaam');

        if ($image) {
            Storage::disk('ftp')->put($imageName, File::get($image));
        }
    }

    /**
     * Insert an item into table 'Bier'.
     * Takes the item fields as request parameters.
     * Requires the field 'naam'.
     *
     * @param Request $request
     * @return void
     */
    public function insert(Request $request)
    {
        $postdata = $request->all();

        if ($request->input('naam')) {
            $bier = new Bier;

            $bier->naam = $request->input('naam');
            $bier->alcoholpercentage = $request->input('alcoholpercentage');
            $bier->IBU = $request->input('ibu');
            $bier->EBC = $request->input('ebc');
//            $bier->ingredienten = $request->input('ingredienten');
            $bier->temperatuur = $request->input('temperatuur');
            $bier->gisting = $request->input('gisting');
//            $bier->glas = $request->input('glas');
            $bier->afbeelding = $request->input('afbeelding');
            $bier->logo = $request->input('logo');
            $bier->seizoen = $request->input('seizoen');
            $bier->sinds = $request->input('sinds');
            $bier->omschrijving = $request->input('omschrijving');
            $bier->brouwerijID = $request->input('brouwerijID');
            $bier->biersoortID = $request->input('biersoortID');

            $bier->save();

            return response()->json($bier);
        } else {
            return response()->json("geen naam");
        }
    }

    /**
     * Deletes an item in table 'Bier'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return void
     */
    public function delete(Request $request)
    {
        $id = $request->input('id');
        if ($id && Bier::where('ID', $id)->exists()) {
            $bier = Bier::find($id);
            $bier->delete();
        } else {
            return "false";
        }
    }

    /**
     * Updates an item in table 'Bier'.
     * Takes the item fields as request parameters.
     * Requires the field 'id' and 'naam'.
     *
     * @param Request $request
     * @return void
     */
    public function update(Request $request)
    {
        $id = $request->input('id');
        $naam = $request->input('naam');
        if ($naam && $id && Bier::where('ID', $id)->exists()) {
            $bier = Bier::find($id);

            $bier->naam = $naam;
            $bier->alcoholpercentage = $request->input('alcoholpercentage');
            $bier->IBU = $request->input('IBU');
            $bier->EBC = $request->input('EBC');
            $bier->ingredienten = $request->input('ingredienten');
            $bier->temperatuur = $request->input('temperatuur');
            $bier->gisting = $request->input('gisting');
            $bier->glas = $request->input('glas');
            $bier->afbeelding = $request->input('afbeelding');
            $bier->seizoen = $request->input('seizoen');
            $bier->sinds = $request->input('sinds');
            $bier->brouwerijID = $request->input('brouwerijID');
            $bier->biersoortID = $request->input('biersoortID');

            $bier->save();
        } else {
            return "false";
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
//use Laravel\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Beer;

/**
 * Contains CRUD functions for table 'Beer'.
 */
class BeerController extends Controller
{
    /**
     * Returns a specific JSON object of type 'Beer'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return Response
     */
    public function get(Request $request)
    {
        $id = $request->input('id');
        if ($id && Beer::where('ID', $id)->exists()) {
            return Beer::where('ID', $id)->first();
        } else {
            return "false";
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

    /**
     * Returns a JSON array of all rows in table 'Beer'
     *
     * @return Reponse
     */
    public function getAll()
    {
        return response()->json(Beer::with('Beertype')->with('Brewery')->get());
    }

    /**
     * Undocumented function
     *
     * @return Response
     */
    public function getNewest()
    {
        return response()->json(Bier::with('Brouwerij')->latest('timestampCreated')->take(5)->get());
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
     * Insert an item into table 'Beer'.
     * Takes the item fields as request parameters.
     * Requires the field 'name'.
     *
     * @param Request $request
     * @return void
     */
    public function insert(Request $request)
    {
        $postdata = $request->all();

       if ($request->input('naam')) {
           $beer = new Beer([
            'name' => $request->input('name'),
            'ABV' => $request->input('ABV'),
            'IBU' => $request->input('IBU'),
            'EBC' =>  $request->input('EBC'),
            'temperature' => $request->input('temperature'),
            'fermentation' => $request->input('fermentation'),
            'glass' => $request->input('glass'),
            'picture' => $request->input('picture'),
            'description' => $request->input('description'),
            'season' => $request->input('picture'),
            'since' => $request->input('since'),
            'since' => $request->input('breweryID'),
            'biertypeID' => $request->input('beertypeID'),
           ]);

           $beer->save();

           return respnse()->json($beer);
       } else {
           return respnse()->json("name_required");
       }
        return response()->json($postdata);
    }

    /**
     * Deletes an item in table 'Beer'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @return void
     */
    public function delete(Request $request)
    {
        $id = $request->input('id');
        if ($id && Beer::where('ID', $id)->exists()) {
            $bier = Beer::find($id);
            $bier->delete();
        } else {
            return "false";
        }
    }

    /**
     * Updates an item in table 'Beer'.
     * Takes the item fields as request parameters.
     * Requires the field 'id' and 'name'.
     *
     * @param Request $request
     * @return void
     */
    public function update(Request $request)
    {
        $id = $request->input('id');
        $name = $request->input('name');
        if ($name && $id && Beer::where('ID', $id)->exists()) {
            $beer = Bier::find($id);

            $beer = array([
                'name' => $request->input('name'),
                'ABV' => $request->input('ABV'),
                'IBU' => $request->input('IBU'),
                'EBC' =>  $request->input('EBC'),
                'temperature' => $request->input('temperature'),
                'fermentation' => $request->input('fermentation'),
                'glass' => $request->input('glass'),
                'picture' => $request->input('picture'),
                'description' => $request->input('description'),
                'season' => $request->input('picture'),
                'since' => $request->input('since'),
                'since' => $request->input('breweryID'),
                'biertypeID' => $request->input('beertypeID'),
               ]);

            $bier->save();
        } else {
            return "false";
        }
    }
}

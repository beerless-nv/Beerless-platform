<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Bier;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Ftp as Adapter;
use Illuminate\Contracts\Filesystem\Factory;

/**
 * Contains CRUD functions for table 'Bier'.
 */
class BierController extends BaseController
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

    /**
     * Returns a JSON array of all rows in table 'Bier'
     *
     * @return Reponse
     */
    public function getAll()
    {
        return response()->json(Bier::with('Biersoort')->with('Brouwerij')->get());
    }

    public function uploadImage(Request $request) {
        $image = $request->file('afbeelding');
        $imageName = $request->file('afbeeldingNaam');

        if ($image) {
//            $filesystem = new Filesystem(new Adapter([
//                'host'     => 'ftp.beerless.be',
//                'username' => 'beerle1q',
//                'password' => 'sselreeB1998',
//
//                // Optional FTP Settings...
//                'port'     => 21,
//                'root'     => '/assets/images/',
//                // 'passive'  => true,
//                // 'ssl'      => true,
//                // 'timeout'  => 30,
//            ]));
//            $filesystem->put($imageName, File::get($image));

//            Storage::disk('local')->put('file.jpg', $image);

            $image->store('avatars');
            return json_encode(true);
        }
        else {
            return json_encode(false);
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
//        $postdata = $request->all();

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
//            $bier->afbeelding = $request->input('afbeelding');
            $bier->seizoen = $request->input('seizoen');
            $bier->sinds = $request->input('sinds');
            $bier->omschrijving = $request->input('omschrijving');
            $bier->brouwerijID = $request->input('brouwerijID');
            $bier->biersoortID = $request->input('biersoortID');

            $bier->save();

            return $bier;
        } else {
            return "geen naam";
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
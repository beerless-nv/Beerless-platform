<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Gebruiker;

/**
 * Contains CRUD functions for table 'Gebruiker'.
 */
class GebruikerController extends BaseController
{
    public function getAll(){
        return response()->json(Gebruiker::get());
    }

    public function login(Request $request){
        $username = $request->input('username');
        $password = $request->input('password');
        $user = $this->checkUserExists($username);
        if($user){
            if($this->checkPassword($username, $password)){
                return "succesfully logged in";

            } else{
                return "Incorrect password";
            }
        } else{
            return "User doesn't exist";
        }

//        exit();
    }

    public function checkUserExists(Request $request){
        $username = $request->input('username');
        if(Gebruiker::where('gebruikersnaam', $username)->exists() || Gebruiker::where('email', $username)->exists()){
            return Gebruiker::where('gebruikersnaam', $username)->first();
        } else{
            return json_encode(false);
        }
    }

    public function checkPassword(Request $request){
        $password = $request->input('password');
        if($password == Gebruiker::select("wachtwoord")->where('gebruikersnaam', $username)->get()){
            return true;
        } else{
            return false;
        }
    }
}
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
    /**
     * Returns a JSON array of all rows in table 'Gebruiker'
     *
     * @return Response
     */
    public function getAll()
    {
        return response()->json(Gebruiker::get());
    }

    /**
     * Returns a specific JSON object of type 'Gebruiker'.
     * Takes the id as a request parameter.
     *
     * @return void
     */
    // public function getUserData(){

    // }

    /**
     * Creates a user based on email, username and password.
     * Takes the email, username and password as request parameter.
     *
     * @return void
     */
    public function signUp(Request $request)
    {
        $retVal;
        try {
            $email = $requst->input('email');
            $username = $request->input('username');
            $password = $reuest->input('password');
            if ($email && $username && $password) {
                if (!Gebruiker::where('gebruikersnaam', $username)->exists()) {
                    if (!Gebruiker::where('gebruikersnaam', $username)->exists()) {
                    }
                } else {
                    $retVal->success = false;
                    $retVal->msg = 'Username already exists';
                }
            } else {
                $retVal->success = false;
                $retVal->msg = 'Invalid credentials';
            }
        } catch (Exception $e) {
            $retVal->success = 'error';
            $retVal->msg = $e->getMessage();
        } finally{
            return response()->json($retVal);
        }
    }

    /**
     * Checks wether a user has submitted valid credentials on login.
     * Takes the username and password as request parameters.
     *
     * @param Request $request
     * @return Response
     */
    public function signIn(Request $request)
    {
        $retVal;
        try {
            $username = $request->input('username');
            $password = $reuest->input('password');
            if ($username && $password) {
                if (Gebruiker::where('gebruikersnaam', $username)->exists()) {
                    $user = Gebruiker::where('gebruikersnaam', $username)->first();
                    if ($password == $user->wachtwoord) {
                        $retVal->success = true;
                        $retVal->user = $user;
                    } else {
                        $retVal->success = false;
                        $retVal->msg = 'Incorrect password';
                    }
                } else {
                    $retVal->success = false;
                    $retVal->msg = 'User does not exist';
                }
            } else {
                $retVal->success = false;
                $retVal->msg = 'Invalid credentials';
            }
        } catch (Exception $e) {
            $retVal->success = 'error';
            $retVal->msg = $e->getMessage();
        } finally{
            return response()->json($retVal);
        }
    }























    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');
        $user = $this->checkUserExists($username);
        if ($user) {
            if ($this->checkPassword($username, $password)) {
                return "succesfully logged in";
            } else {
                return "Incorrect password";
            }
        } else {
            return "User doesn't exist";
        }
    }

    public function checkUserExists(Request $request)
    {
        $username = $request->input('username');
        if (Gebruiker::where('gebruikersnaam', $username)->exists() || Gebruiker::where('email', $username)->exists()) {
            return Gebruiker::select('id', 'gebruikersnaam')->where('gebruikersnaam', $username)->first();
        } else {
            return json_encode(false);
        }
    }

    public function checkPassword(Request $request)
    {
        $password = $request->input('password');
        $username = $request->input('username');
        if ($password == Gebruiker::select("wachtwoord")->where('gebruikersnaam', $username)) {
            return response()->json(true);
        } else {
            return response()->json(false);
        }
    }

    public function getUserData(Request $request)
    {
        $id = $request->input('id');
        if ($id) {
            return response()->json(Gebruiker::select('gebruikersnaam', 'voornaam', 'achternaam', 'profielfoto', 'bio', 'land', 'provincie', 'plaats', 'timestamp')->where('ID', $id)->first());
        } else {
            return null;
        }
    }
}

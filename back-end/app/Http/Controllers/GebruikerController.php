<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Gebruiker;

/**
 * Contains CRUD functions for table 'Gebruiker'.
 */
class GebruikerController extends Controller
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
    public function getUserData(){

    }

    /**
     * Creates a user based on email, username and password.
     * Takes the email, username and password as request parameter.
     *
     * @return Response
     */
    public function signUp(Request $request){
        $retVal;     
        try{            
            $retVal = array();
            $email = $requst->input('email');
            $username = $request->input('username');
            $password = $reuest->input('password');            
            if($email && $username && $password){
                if(!Gebruiker::where('gebruikersnaam', $username)->exists()){
                    if(!Gebruiker::where('email', $email)->exists()){
                        $user = new Gebruiker;
                        $user->gebruikersnaam = $username;
                        $user->email = $email;
                        $user->password = $password;
                        $user->save();

                        $retVal['success'] = true;
                        $retVal['user'] = $user;
                    } else{
                        $retVal['success'] = false;
                        $retVal['msg'] = 'Email is already in use';
                    }
                } else{
                    $retVal['success'] = false;
                    $retVal['msg'] = 'Username already exists';
                }
            } else{
                $retVal['success'] = false;
                $retVal['msg'] = 'Invalid credentials';
            }            
        } catch (Exception $e){
            $retVal['success'] = 'error';
            $retVal['msg'] = $e->getMessage();
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
    public function signIn(Request $request){   
        $retVal = array();           
        try{         
            $username = $request->input('username');
            $password = $request->input('password');

            if($username && $password){
                if(Gebruiker::where('gebruikersnaam', $username)->exists()){
                    $user = Gebruiker::where('gebruikersnaam', $username)->first();
                    if($password == $user->wachtwoord){
                        $retVal['success'] = true;
                        $retVal['user'] = $user;
                    } else{
                        $retVal['success'] = false;
                        $retVal['msg'] = 'Incorrect password';
                    }
                } else{
                    $retVal['success'] = false;
                    $retVal['msg'] = 'User does not exist';
                }
            } else{
                $retVal['success'] = false;
                $retVal['msg'] = 'Invalid credentials';
            }            
        } catch (Exception $e){
            $retVal['success'] = 'error';
            $retVal['msg'] = $e->getMessage();
        } finally{
            return response()->json($retVal);
        }
    }
}

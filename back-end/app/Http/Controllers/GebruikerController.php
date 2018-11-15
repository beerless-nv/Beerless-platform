<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Gebruiker;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

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
     *
     * @return Response
     */
    public function signUp(Request $request){
        // Validate incoming request
        $this->validate($request, [
            'username' => 'required|unique:gebruiker,gebruikersnaam',
            'email' => 'required|email|unique:gebruiker',
            'password' => 'required'
        ],
        [
            'username.required' => 'username_required',
            'username.unique' => 'username_not_unique',
            'email.required' => 'email_required',
            'email.email' => 'email_not_valid',
            'email.unique' => 'email_not_unique',
            'password.required' => 'password_required'
        ]);

        // Create new user based on input
        $user = new Gebruiker([
            'gebruikersnaam' => $request->input('username'),
            'email' => $request->input('email'),
            'wachtwoord' => bcrypt($request->input('password'))
        ]);

        // Store user in DB
        $user->save();

        // Return response
        return response()->json( [
            'success' => true,
            'user' => $user
        ], 201);
    }   

    /**
     * Checks wether a user has submitted valid credentials on login.
     * 
     * @param Request $request
     * @return Response
     */
    public function signIn(Request $request){   
        // Validate incoming request
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required'
        ],
        [
            'username.required' => 'username_required',
            'password.required' => 'password_required'
        ]);
        $retVal['success'] = false;
        $username = $request->input('username');
        $credentials = $request->only('username', 'password');
        try{
            if( ! $token = JWTAuth::attempt([
                'gebruikersnaam' => $request->input('username'),
                'wachtwoord' => $request->input('password'),
            ])){
                if(Gebruiker::where('gebruikersnaam', $username)->exists()){
                    $retVal['msg'] = 'password_incorrect';                        
                } else{
                    $retVal['msg'] = 'user_does_not_exist';                    
                }
                return response()->json( $retVal, 401);
            }
        } catch (JWTException $e){
            $retVal['success'] = 'error';
            $retVal['msg'] = 'token_creation_failed';
            return response()->json( $retVal, 500);
        }

        $retVal['success'] = true;
        $retVal['token'] = $token;
        $retVal['user'] = Gebruiker::where('gebruikersnaam', $username)->first();
        return response()->json( $retVal, 200);
    }
}

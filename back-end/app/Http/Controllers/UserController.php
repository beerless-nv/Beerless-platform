<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

use App\Models\User;

/**
 * Contains CRUD functions for table 'User'.
 */
class UserController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'User'
     *
     * @return Response
     */
    public function getAll()
    {
        return response()->json(User::get());
    }

    /**
     * Returns a specific JSON object of type 'User'.
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
            'username' => 'required|unique:user,username',
            'email' => 'required|email|unique:user',
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
        $user = new User([
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
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
     * Returns a valid token if correct.
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
        $password = $request->input('password');
        try{    

            // Check user existance        
            if(User::where('username', $username)->exists()){                
                $user = User::where('username', $username)->first(); 

                // Check password              
                if(Hash::check($password, $user->password)){

                    // Credentials are correct
                    $retVal['success'] = true;
                    $retVal['token'] = JWTAuth::fromUser($user);
                    $retVal['user'] = $user;
                    return response()->json( $retVal, 200);                     
                } else{
                    $retVal['msg'] = 'password_incorrect'; 
                }                                  
            } else{
                $retVal['msg'] = 'user_does_not_exist';                    
            }

            // Return failed login with failure msg
            return response()->json( $retVal, 401);
            
        } catch (JWTException $e){
            $retVal['success'] = 'error';
            $retVal['msg'] = 'token_creation_failed';
            return response()->json( $retVal, 500);
        }        
    }
}

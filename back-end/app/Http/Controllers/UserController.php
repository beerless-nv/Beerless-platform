<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

use App\Models\User;
use App\DataServices\UserDataService;

/**
 * Contains CRUD functions for table 'User'.
 */
class UserController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'User'
     *
     * @param Request request
     * @return Response
     */
    public function getAll(Request $request)
    {
        $limit = null;
        if($request->query('limit') != null){
            $limit = intval($request->query('limit'));
            if(!is_int($limit) || $limit < 1){
                return response()->json([
                    'succes' => false,
                    'msg' => 'limit_not_valid'
                ]);
            }
        }        
        
        $offset = null;
        if($request->query('offset') != null){
            $offset = intval($request->query('offset'));
            if(!is_int($offset) || $offset < 1){
                return response()->json([
                    'succes' => false,
                    'msg' => 'offset_not_valid'
                ]);
            } if($limit == null){
                return response()->json([
                    'success' => false,
                    'msg' => 'limit_not_set'
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'users' => UserDataService::getAll($limit, $offset)
        ], 200);
    }

     /**
      * Returns a specific JSON object of type 'User'.
      * Takes the id as a request parameter.
      *
      * @param Request $request
      * @param integer $userId
      * @return Response
      */
    public function get(Request $request, int $userId){
        return response()->json([
            'success' => true,
            'user' => UserDataService::get($userId)
        ],200);
    }


    public function search(Request $request){
        // return UserDataService::search();
    }

    /**
     * Creates a user based on email, username and password.
     *
     * @return Response
     */
    public function signUp(Request $request){
        // Validate incoming request
        $this->validate($request, [
            'inputObject.username' => 'required|unique:user,username',
            'inputObject.email' => 'required|email|unique:user,email',
            'inputObject.password' => 'required'
        ],
        [
            'username.required' => 'username_required',
            'username.unique' => 'username_not_unique',
            'email.required' => 'email_required',
            'email.email' => 'email_not_valid',
            'email.unique' => 'email_not_unique',
            'password.required' => 'password_required'
        ]);
        $inputObject = $request->input('inputObject');        
        $inputObject['password'] = Hash::make($inputObject['password']);
        
        $user = UserDataService::insert($inputObject);
        
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
            $retVal['msg'] = $e->getMessage();
            return response()->json( $retVal, 500);
        }        
    }

    // public function test(Request $request)
    // {
    //     if (! $user = JWTAuth::parseToken()->authenticate()) {
	// 		return response()->json(['user_not_found'], 404);
    //     }
    //     else{
    //         return response()->json($user, 200);
    //     }
    // }
}

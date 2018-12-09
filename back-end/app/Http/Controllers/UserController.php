<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Validator;

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
        if ($request->query('limit') != null) {
            $limit = intval($request->query('limit'));
            if (!is_int($limit) || $limit < 1) {
                return response()->json([
                    'succes' => false,
                    'msg' => 'limit_not_valid'
                ]);
            }
        }

        $offset = null;
        if ($request->query('offset') != null) {
            $offset = intval($request->query('offset'));
            if (!is_int($offset) || $offset < 1) {
                return response()->json([
                    'succes' => false,
                    'msg' => 'offset_not_valid'
                ]);
            }
            if ($limit == null) {
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
    public function get(Request $request, int $userId)
    {
//        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        return response()->json([
            'success' => true,
            'user' => UserDataService::get($userId)
        ], 200);
    }


    public function search(Request $request)
    {
        // return UserDataService::search();
    }

    /**
     * Creates a user based on email, username and password.
     *
     * @return Response
     */
    public function signUp(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'inputObject.username' => 'required|unique:user,username',
            'inputObject.email' => 'required|email|unique:user,email',
            'inputObject.password' => 'required'
        ],
            [
                'inputObject.username.required' => 'username_required',
                'inputObject.username.unique' => 'username_not_unique',
                'inputObject.email.required' => 'email_required',
                'inputObject.email.email' => 'email_not_valid',
                'inputObject.email.unique' => 'email_not_unique',
                'inputObject.password.required' => 'password_required'
            ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'msg' => $validator->messages()->all()
            ], 400);
        }

        $inputObject = $request->input('inputObject');
        $inputObject['password'] = Hash::make($inputObject['password']);

        $user = UserDataService::insert($inputObject);

        // Return response
        return response()->json([
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
    public function signIn(Request $request)
    {

        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required'
        ],
            [
                'username.required' => 'username_required',
                'password.required' => 'password_required'
            ]);

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        }


        $username = $request->input('username');
        $password = $request->input('password');
        try {
            // Check user existance
            if (User::where('username', $username)->exists()) {
                $user = User::where('username', $username)->first();

                // Check password              
                if (Hash::check($password, $user->password)) {

                    // Credentials are correct
                    $retVal['success'] = true;
                    $retVal['token'] = JWTAuth::fromUser($user);
                    $retVal['user'] = $user;

                    return response()->json($retVal, 200);
                } else {
                    $retVal['msg'] = array('password_incorrect');
                }
            } else {
                $retVal['msg'] = array('user_does_not_exist');
            }

            // Return failed login with failure msg
            return response()->json($retVal, 401);

        } catch (JWTException $e) {
            $retVal['success'] = 'error';
            $retVal['msg'] = array($e->getMessage());
            return response()->json($retVal, 500);
        }
    }

    /**
     * Insert an item into table 'User'.
     *
     * POST /users
     *
     * @param Request $request
     * @return Response
     */
    public function insert(Request $request)
    {
        $user = '';
        if (isset($request->input('inputObject')['email'])) {
            $user = UserDataService::insert($request->input('inputObject'));
        } else {
            return response()->json([
                'success' => false,
                'msg' => 'email_required'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'user' => $user
        ], 201);
    }
}

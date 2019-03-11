<?php

namespace App\Http\Controllers;

use App\Models\UserSocial;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

use App\Models\User;
use App\DataServices\UserDataService;

use Illuminate\Http\Request;

/**
 * Contains CRUD functions for table 'User'.
 */
class UserController extends Controller
{
    /**
     * Returns a JSON array of all rows in table 'User'
     *
     * @param Request request
     * @return JsonResponse
     */
    public function getAll(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if ($orderBy != null) {
            $sortOrder[$orderBy[0]] = $orderBy[1];
        } else {
            $sortOrder = null;
        }

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

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'users' => UserDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'User'.
     * Takes the id as a request parameter.
     *
     * @param Request $request
     * @param integer $userId
     * @return JsonResponse
     */
    public function get(Request $request, int $userId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'user' => UserDataService::get($userId, $joinTables, $value)
        ], 200);
    }


    public function search(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if ($orderBy != null) {
            $sortOrder[$orderBy[0]] = $orderBy[1];
        } else {
            $sortOrder = null;
        }

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

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'users' => UserDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Creates a user based on email, username and password.
     *
     * @return JsonResponse
     */
    public function signUp(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'inputObject.firstName' => 'required',
            'inputObject.lastName' => 'required',
            'inputObject.username' => 'required|unique:user,username',
            'inputObject.email' => 'required|email|unique:user,email',
            'inputObject.password' => 'required'
        ],
            [
                'inputObject.firstName' => 'firstName_required',
                'inputObject.lastName' => 'lastName_required',
                'inputObject.username.required' => 'username_required',
                'inputObject.username.unique' => 'username_not_unique',
                'inputObject.email.required' => 'email_required',
                'inputObject.email.email' => 'email_not_valid',
                'inputObject.email.unique' => 'email_not_unique',
                'inputObject.password.required' => 'password_required'
            ]);

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal,400);
        } else {
            $inputObject = $request->input('inputObject');
            $inputObject['password'] = Hash::make($inputObject['password']);

            $user = UserDataService::insert($inputObject);
        }

        // Return response
        return response()->json([
            'success' => true,
            'user' => $user
        ], 201);
    }

    /**
     * Checks whether a user has submitted valid credentials on login.
     * Returns a valid token if correct.
     *
     * @param Request $request
     * @return JsonResponse
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
            // Check user existence
            if (User::where('username', $username)->exists()) {
                $user = User::where('username', $username)->first();

                // Check password              
                if (Hash::check($password, $user->password)) {

                    // Credentials are correct
                    $retVal['success'] = true;
                    $customClaims = ['role' => $user['usertype']];
                    $retVal['token'] = JWTAuth::fromUser($user, $customClaims);
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
     * Returns a valid JWT token for the social login.
     *
     * GET /users/token
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getSocialToken(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'socialID' => 'required',
        ],
            [
                'socialID.required' => 'socialID_required',
            ]);

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        }

        try {
            // Check if socialID matches a person in the database, if so a JWT is created
            $userId = UserSocial::with('user')->where('socialID', $request['socialID'])->value('userID');

            if ($userId !== null) {
                // Credentials are correct, socialID is present in the database
                $user = User::with('usersocial')->where('ID', $userId)->get();

                // Create JWT token
                $retVal['success'] = true;
                $customClaims = ['role' => $user[0]['usertype']];
                $retVal['token'] = JWTAuth::fromUser($user[0], $customClaims);
                $retVal['user'] = $user;

                return response()->json($retVal, 200);
            } else {
                // Credentials are wrong, social userID isn't present in the database
                $retVal['msg'] = array('credentials_incorrect');
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
     * @return JsonResponse
     */
//    public function insert(Request $request)
//    {
//        $user = '';
//        if (isset($request->input('inputObject')['email'])) {
//            $user = UserDataService::insert($request->input('inputObject'));
//        } else {
//            return response()->json([
//                'success' => false,
//                'msg' => 'email_required'
//            ], 400);
//        }
//
//        return response()->json([
//            'success' => true,
//            'user' => $user
//        ], 201);
//    }

    /**
     * Updates an item in table 'User'.
     * Takes the item fields as request parameters.
     * Requires the field 'id'.
     *
     * PATCH /users/$userId
     *
     * @param Request $request
     * @param integer $userId
     * @return JsonResponse
     */
    public function patchProfile(Request $request, int $userId)
    {
        $adjustedUsername = false;
        $adjustedEmail = false;
        $userOriginal = $this->get($request, $userId);
        if ($userOriginal->original['user']['username'] !== $request->updateObject['username']) {
            $adjustedUsername = true;

        } else if ($userOriginal->original['user']['email'] !== $request->updateObject['email']) {
            $adjustedEmail = true;
        }

        // Validate incoming request
        $validator = Validator::make($request->updateObject, [
            'username' => 'required',
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'required',
        ],
            [
                'username' => 'username_required',
                'username.unique' => 'username_not_unique',
                'firstName.required' => 'firstName_required',
                'lastName.required' => 'lastName_required',
                'email.required' => 'email_required',
                'email.unique' => 'email_not_unique',
            ]);

        $validator->sometimes('username', 'unique:user,username', function () use ($adjustedUsername) {
            return $adjustedUsername;
        });
        $validator->sometimes('email', 'unique:user,email', function () use ($adjustedEmail) {
            return $adjustedEmail;
        });

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'msg' => $validator->messages()->all()
            ], 400);
        }

        $user = UserDataService::update($userId, $request->updateObject);

        return response()->json([
            'success' => true,
            'user' => $user
        ], 200);
    }

    public function patchAddress(Request $request, int $userId)
    {
        $user = UserDataService::update($userId, $request->updateObject);

        return response()->json([
            'success' => true,
            'user' => $user
        ], 200);
    }

    /**
     * Loads image to server
     *
     * @param Request $request
     */
    public function uploadPicture(Request $request)
    {
        $image = $request->file('picture');
        $imageName = $request->input('picturePath') . $request->input('pictureName');

        if ($image) {
            Storage::disk('ftp')->put($imageName, File::get($image));
        }
    }
}

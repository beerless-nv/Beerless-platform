<?php

namespace App\Http\Controllers;

use App\DataServices\ContactDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Contains CRUD functions for table 'Contact'.
 */
class ContactController extends Controller
{
    /**
     * Validator for the table 'Activity'
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data) {
        return Validator::make($data, [
            'breweryID' => 'required|unique:contact,breweryID|numeric',
        ],
            [
                'breweryID.required' => 'brewery_required',
                'breweryID.unique' => 'breweryID_not_unique',
                'breweryID.numeric' => 'breweryID_not_numeric',
            ]);
    }




    /**
     * Returns a JSON array of all rows in table 'Contact'.
     *
     * GET /contacts
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getAll(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if($orderBy != null){$sortOrder[$orderBy[0]] = $orderBy[1];}
        else {$sortOrder = null;}

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

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'contacts' => ContactDataService::getAll($joinTables, $sortOrder, $limit, $offset, $value)
        ], 200);
    }

    /**
     * Returns a specific JSON object of type 'Contact'.
     * Takes the id as a request parameter.
     *
     * GET /contacts/contactId
     *
     * @param Request $request
     * @param integer $contactId
     * @return Reponse
     */
    public function get(Request $request, int $contactId)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            'success' => true,
            'contact' => ContactDataService::get($contactId, $joinTables, $value)
        ],200);
    }

    /**
     * Returns a JSON array of all rows in table 'Contact' which match with the specified search parameters.
     *
     * GET /contacts/search
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request)
    {
        $joinTables = ($request->query('joinTables') == null) ? null : explode(',', $request->query('joinTables'));

        $orderBy = ($request->query('orderBy') == null) ? null : explode('.', $request->query('orderBy'));
        if($orderBy != null){$sortOrder[$orderBy[0]] = $orderBy[1];}
        else {$sortOrder = null;}

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

        $value = ($request->query('value') == null) ? null : explode(',', $request->query('value'));

        return response()->json([
            "success" => true,
            'contacts' => ContactDataService::search($request->input('searchParams'), $joinTables, $sortOrder, $limit, $offset, $value)
        ]);
    }

    /**
     * Insert an item into table 'Contact'.
     * Takes the item fields as request parameters.
     *
     * POST /contacts
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function insert(Request $request)
    {
        $validator = $this->validator($request->input('inputObject'));

        $retVal['success'] = false;
        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $contact = ContactDataService::insert($request->input('inputObject'));
        }

        return response()->json([
            'success' => true,
            'contact' => $contact
        ], 201);
    }

    /**
     * Updates an item in table 'Contact'.
     * Takes the item fields as request parameters.
     *
     * PUT /contacts/$contactId
     *
     * @param Request $request
     * @param integer $contactId
     * @return JsonResponse
     */
    public function update(Request $request, int $contactId)
    {
        $validator = $this->validator($request->input('updateObject'));

        if ($validator->fails()) {
            $retVal['msg'] = $validator->messages()->all();
            return response()->json($retVal, 400);
        } else {
            $contact = ContactDataService::update($contactId, $request->input('updateObject'));
        }

        return response()->json([
            'success' => true,
            'contact' => $contact
        ], 200);
    }

    /**
     * Deletes an item in table 'Contact'.
     * Takes the id as a request parameter.
     *
     * DELETE /contacts/contactId
     *
     * @param Request $request
     * @param integer $contactId
     * @return JsonResponse
     */
    public function delete(Request $request, int $contactId)
    {
        ContactDataService::delete($contactId);
        return response()->json([
            'success' => true
        ], 204);
    }
}

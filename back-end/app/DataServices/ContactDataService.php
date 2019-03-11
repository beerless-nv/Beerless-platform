<?php
/**
 * Created by PhpStorm.
 * User: Tom Nuyts
 * Date: 8/03/2019
 * Time: 15:16
 */

namespace App\DataServices;


use App\Models\Contact;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ContactDataService
{
    /**
     * Undocumented function
     *
     * @return Contact[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value){
        $query = Contact::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'contact', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $contactId
     * @return Contact
     */
    public static function get(int $contactId, $joinTables, $value){
        $query = Contact::query();
        \joinTables($query, 'contact', $joinTables);
        return $query->findOrFail($contactId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Contact[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value){
        $query = Contact::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'contact', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $param){
            $query->where($param['propName'], $param['operator'], $param['value']);
        }

        if ($searchParams[0]['value'] == '') {
            return [];
        } else {
            return $query->get($value);
        }
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Contact
     */
    public static function insert(array $inputArray){
        $contact = new Contact();
        foreach ($inputArray as $key => $value){
            $contact[$key] = $value;
        }
        $contact->save();
        return $contact;
    }

    /**
     * Undocumented function
     *
     * @param integer $contactId
     * @param array $updateArray
     * @return Contact
     */
    public static function update(int $contactId ,array $updateArray){
        $contact = Contact::findOrFail($contactId);
        foreach ($updateArray as $key => $value){
            $contact[$key] = $value;
        }

        $contact->save();
        return $contact;
    }

    /**
     * Undocumented function
     *
     * @param integer $contactId
     * @return void
     */
    public static function delete(int $contactId){
        if(Contact::where('id', $contactId)->exists()){
            Contact::destroy($contactId);
        } else{
            throw new ModelNotFoundException();
        }

    }
}

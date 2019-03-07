<?php

namespace App\DataServices;

use App\Models\User;
use App\DataServices\UserSocialDataService;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class UserDataService
{
    /**
     * Undocumented function
     *
     * @return User[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = User::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'user', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $userId
     * @return User
     */
    public static function get(int $userId, $joinTables, $value)
    {
        $query = User::query();
        \joinTables($query, 'user', $joinTables);
        return $query->findOrFail($userId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return User||User[]||null
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = User::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'user', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $param){
            if($param['propName'] == 'username'){
                $query->whereRaw('LOWER(username) like ?', ['%' . strtolower($param['value']) . '%']);
            } else{
                $query->where($param['propName'], $param['operator'], $param['value']);
            }
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
     * @return User
     */
    public static function insert(array $inputArray)
    {
        $user = new User();
        foreach ($inputArray as $key => $value){
            $user[$key] = $value;
        }
        $user->save();
        return $user;
    }

    /**
     * Undocumented function
     *
     * @param integer $userId
     * @param array $updateArray
     * @return User
     */
    public static function update(int $userId, array $updateArray)
    {
        $user = User::findOrFail($userId);
        foreach ($updateArray as $key => $value){
            $user[$key] = $value;
        }

        $user->save();
        return $user;
    }

    /**
     * Undocumented function
     *
     * @param integer $userId
     * @return void
     */
    public static function delete(int $userId)
    {
        if(User::where('id', $userId)->exists()){
            User::destroy($userId);
        } else{
            throw new ModelNotFoundException();
        }        
    }
}

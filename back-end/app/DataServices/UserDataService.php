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
    public static function getAll($joinTables, $sortOrder, $limit, $offset)
    {
        $query = User::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'user', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get();
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
     * @return User
     */
    public static function get(int $userId)
    {
        return User::with('usersocial')->findOrFail($userId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return User||User[]||null
     */
    public static function search()
    {
        // $user = new User();
        // return $user->all();
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
}
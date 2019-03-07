<?php

namespace App\DataServices;

use App\Models\UserSocial;

class UserSocialDataService
{
    /**
     * Undocumented function
     *
     * @return UserSocial[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = UserSocial::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'usersocial', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $usersocialId
     * @return UserSocial
     */
    public static function get(int $usersocialId, $joinTables, $value)
    {
        $query = UserSocial::query();
        \joinTables($query, 'usersocial', $joinTables);
        return $query->findOrFail($usersocialId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return UserSocial[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = UserSocial::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'usersocial', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $param) {
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
     * @return UserSocial
     */
    public static function insert(array $inputArray)
    {
        $usersocial = new UserSocial();
        foreach ($inputArray as $key => $value) {
            $usersocial[$key] = $value;
        }
        $usersocial->save();
        return $usersocial;
    }

    /**
     * Undocumented function
     *
     * @param integer $usersocialId
     * @param array $updateArray
     * @return UserSocial
     */
    public static function update(int $usersocialId, array $updateArray)
    {
        $usersocial = UserSocial::findOrFail($usersocialId);
        foreach ($updateArray as $key => $value){
            $usersocial[$key] = $value;
        }

        $usersocial->save();
        return $usersocial;
    }

    /**
     * Undocumented function
     *
     * @param integer $usersocialId
     * @return void
     */
    public static function delete(int $usersocialId)
    {
        if(UserSocial::where('id', $usersocialId)->exists()){
            UserSocial::destroy($usersocialId);
        } else{
            throw new ModelNotFoundException();
        }
    }
}

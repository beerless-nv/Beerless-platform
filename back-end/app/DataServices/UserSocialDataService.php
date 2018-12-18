<?php
namespace App\DataServices;

use App\Models\UserSocial;

class UserSocialDataService
{
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
     * @return UserSocial
     */
    public static function get(int $usersocialId, $joinTables)
    {
        $query = UserSocial::query();
        \joinTables($query, 'usersocial', $joinTables);
        return $query->findOrFail($usersocialId);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return UserSocial[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder)
    {
        $query = UserSocial::query();
        \joinTables($query, 'usersocial', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $value) {
            if ($value['propName'] == 'name') {
                $query->whereRaw('LOWER(name) like ?', ['%' . strtolower($value['value']) . '%']);
            } else {
                $query->where($value['propName'], $value['operator'], $value['value']);
            }
        }
        return $query->get();
    }
}
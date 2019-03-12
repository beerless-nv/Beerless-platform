<?php
/**
 * Created by PhpStorm.
 * User: Tom Nuyts
 * Date: 12/03/2019
 * Time: 9:19
 */

namespace App\DataServices;


use App\Models\UserRole;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRoleDataService
{
    /**
     * Undocumented function
     *
     * @return UserRole[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = UserRole::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'userrole', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $userroleId
     * @return UserRole
     */
    public static function get(int $userroleId, $joinTables, $value)
    {
        $query = UserRole::query();
        \joinTables($query, 'userrole', $joinTables);
        return $query->findOrFail($userroleId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return UserRole[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = UserRole::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'userrole', $joinTables);
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
     * @return UserRole
     */
    public static function insert(array $inputArray)
    {
        $userrole = new UserRole();
        foreach ($inputArray as $key => $value) {
            $userrole[$key] = $value;
        }
        $userrole->save();
        return $userrole;
    }

    /**
     * Undocumented function
     *
     * @param integer $userroleId
     * @param array $updateArray
     * @return UserRole
     */
    public static function update(int $userroleId, array $updateArray)
    {
        $userrole = UserRole::findOrFail($userroleId);
        foreach ($updateArray as $key => $value) {
            $userrole[$key] = $value;
        }
        $userrole->save();
        return $userrole;
    }

    /**
     * Undocumented function
     *
     * @param integer $userroleId
     * @return void
     */
    public static function delete(int $userroleId)
    {
        if (UserRole::where('id', $userroleId)->exists()) {
            UserRole::destroy($userroleId);
        } else {
            throw new ModelNotFoundException();
        }

    }
}

<?php
/**
 * Created by PhpStorm.
 * User: Tom Nuyts
 * Date: 12/03/2019
 * Time: 9:33
 */

namespace App\DataServices;


use App\Models\Role;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RoleDataService
{
    /**
     * Undocumented function
     *
     * @return Role[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Role::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'role', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $roleId
     * @return Role
     */
    public static function get(int $roleId, $joinTables, $value)
    {
        $query = Role::query();
        \joinTables($query, 'role', $joinTables);
        return $query->findOrFail($roleId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Role[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Role::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'role', $joinTables);
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
     * @return Role
     */
    public static function insert(array $inputArray)
    {
        $role = new Role();
        foreach ($inputArray as $key => $value) {
            $role[$key] = $value;
        }
        $role->save();
        return $role;
    }

    /**
     * Undocumented function
     *
     * @param integer $roleId
     * @param array $updateArray
     * @return Role
     */
    public static function update(int $roleId, array $updateArray)
    {
        $role = Role::findOrFail($roleId);
        foreach ($updateArray as $key => $value) {
            $role[$key] = $value;
        }
        $role->save();
        return $role;
    }

    /**
     * Undocumented function
     *
     * @param integer $roleId
     * @return void
     */
    public static function delete(int $roleId)
    {
        if (Role::where('id', $roleId)->exists()) {
            Role::destroy($roleId);
        } else {
            throw new ModelNotFoundException();
        }

    }
}

<?php
/**
 * Created by PhpStorm.
 * User: Tom Nuyts
 * Date: 12/03/2019
 * Time: 9:55
 */

namespace App\DataServices;


use App\Models\Permission;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PermissionDataService
{
    /**
     * Undocumented function
     *
     * @return Permission[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Permission::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'permission', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $permissionId
     * @return Permission
     */
    public static function get(int $permissionId, $joinTables, $value)
    {
        $query = Permission::query();
        \joinTables($query, 'permission', $joinTables);
        return $query->findOrFail($permissionId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Permission[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Permission::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'permission', $joinTables);
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
     * @return Permission
     */
    public static function insert(array $inputArray)
    {
        $permission = new Permission();
        foreach ($inputArray as $key => $value) {
            $permission[$key] = $value;
        }
        $permission->save();
        return $permission;
    }

    /**
     * Undocumented function
     *
     * @param integer $permissionId
     * @param array $updateArray
     * @return Permission
     */
    public static function update(int $permissionId, array $updateArray)
    {
        $permission = Permission::findOrFail($permissionId);
        foreach ($updateArray as $key => $value) {
            $permission[$key] = $value;
        }
        $permission->save();
        return $permission;
    }

    /**
     * Undocumented function
     *
     * @param integer $permissionId
     * @return void
     */
    public static function delete(int $permissionId)
    {
        if (Permission::where('id', $permissionId)->exists()) {
            Permission::destroy($permissionId);
        } else {
            throw new ModelNotFoundException();
        }

    }
}

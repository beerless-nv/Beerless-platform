<?php
/**
 * Created by PhpStorm.
 * User: Tom Nuyts
 * Date: 12/03/2019
 * Time: 9:45
 */

namespace App\DataServices;


use App\Models\RoleTablePermission;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RoleTablePermissionDataService
{
    /**
     * Undocumented function
     *
     * @return RoleTablePermission[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = RoleTablePermission::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'roleTablePermission', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $roleTablePermissionId
     * @return RoleTablePermission
     */
    public static function get(int $roleTablePermissionId, $joinTables, $value)
    {
        $query = RoleTablePermission::query();
        \joinTables($query, 'roleTablePermission', $joinTables);
        return $query->findOrFail($roleTablePermissionId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return RoleTablePermission[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = RoleTablePermission::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'roleTablePermission', $joinTables);
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
     * @return RoleTablePermission
     */
    public static function insert(array $inputArray)
    {
        $roleTablePermission = new RoleTablePermission();
        foreach ($inputArray as $key => $value) {
            $roleTablePermission[$key] = $value;
        }
        $roleTablePermission->save();
        return $roleTablePermission;
    }

    /**
     * Undocumented function
     *
     * @param integer $roleTablePermissionId
     * @param array $updateArray
     * @return RoleTablePermission
     */
    public static function update(int $roleTablePermissionId, array $updateArray)
    {
        $roleTablePermission = RoleTablePermission::findOrFail($roleTablePermissionId);
        foreach ($updateArray as $key => $value) {
            $roleTablePermission[$key] = $value;
        }
        $roleTablePermission->save();
        return $roleTablePermission;
    }

    /**
     * Undocumented function
     *
     * @param integer $roleTablePermissionId
     * @return void
     */
    public static function delete(int $roleTablePermissionId)
    {
        if (RoleTablePermission::where('id', $roleTablePermissionId)->exists()) {
            RoleTablePermission::destroy($roleTablePermissionId);
        } else {
            throw new ModelNotFoundException();
        }

    }
}

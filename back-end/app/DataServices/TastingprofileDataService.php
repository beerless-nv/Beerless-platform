<?php
/**
 * Created by PhpStorm.
 * User: Tom Nuyts
 * Date: 12/03/2019
 * Time: 10:04
 */

namespace App\DataServices;


use App\Models\Tastingprofile;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TastingprofileDataService
{
    /**
     * Undocumented function
     *
     * @return Tastingprofile[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Tastingprofile::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'tastingprofile', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $tastingprofileId
     * @return Tastingprofile
     */
    public static function get(int $tastingprofileId, $joinTables, $value)
    {
        $query = Tastingprofile::query();
        \joinTables($query, 'tastingprofile', $joinTables);
        return $query->findOrFail($tastingprofileId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Tastingprofile[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Tastingprofile::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'tastingprofile', $joinTables);
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
     * @return Tastingprofile
     */
    public static function insert(array $inputArray)
    {
        $tastingprofile = new Tastingprofile();
        foreach ($inputArray as $key => $value) {
            $tastingprofile[$key] = $value;
        }
        $tastingprofile->save();
        return $tastingprofile;
    }

    /**
     * Undocumented function
     *
     * @param integer $tastingprofileId
     * @param array $updateArray
     * @return Tastingprofile
     */
    public static function update(int $tastingprofileId, array $updateArray)
    {
        $tastingprofile = Tastingprofile::findOrFail($tastingprofileId);
        foreach ($updateArray as $key => $value) {
            $tastingprofile[$key] = $value;
        }
        $tastingprofile->save();
        return $tastingprofile;
    }

    /**
     * Undocumented function
     *
     * @param integer $tastingprofileId
     * @return void
     */
    public static function delete(int $tastingprofileId)
    {
        if (Tastingprofile::where('id', $tastingprofileId)->exists()) {
            Tastingprofile::destroy($tastingprofileId);
        } else {
            throw new ModelNotFoundException();
        }

    }
}

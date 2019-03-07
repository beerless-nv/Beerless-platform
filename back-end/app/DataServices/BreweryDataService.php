<?php

namespace App\DataServices;

use App\Models\Brewery;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class BreweryDataService
{
    /**
     * Undocumented function
     *
     * @return Brewery[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Brewery::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'brewery', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $breweryId
     * @return Brewery
     */
    public static function get(int $breweryId, $joinTables, $value)
    {
        $query = Brewery::query();
        \joinTables($query, 'brewery', $joinTables);
        return $query->findOrFail($breweryId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Brewery[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Brewery::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'brewery', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $param) {
            if ($param['propName'] == 'name') {
                $query->whereRaw('LOWER(name) like ?', ['%' . strtolower($param['value']) . '%']);
            } else {
                $query->where($param['propName'], $param['operator'], $param['value']);
            }
        }

        if ($searchParams[0]['value'] == '') {
            return '';
        } else {
            return $query->get($value);
        }
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Brewery
     */
    public static function insert(array $inputArray)
    {
        $brewery = new Brewery();
        foreach ($inputArray as $key => $value) {
            $brewery[$key] = $value;
        }
        $brewery->save();
        return $brewery;
    }

    /**
     * Undocumented function
     *
     * @param integer $breweryId
     * @param array $updateArray
     * @return Brewery
     */
    public static function update(int $breweryId, array $updateArray)
    {
        $brewery = Brewery::findOrFail($breweryId);
        foreach ($updateArray as $key => $value) {
            $brewery[$key] = $value;
        }

        $brewery->save();
        return $brewery;
    }

    /**
     * Undocumented function
     *
     * @param integer $breweryId
     * @return void
     */
    public static function delete(int $breweryId)
    {
        if (Brewery::where('id', $breweryId)->exists()) {
            Brewery::destroy($breweryId);
        } else {
            throw new ModelNotFoundException();
        }

    }
}

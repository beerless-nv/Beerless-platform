<?php

namespace App\DataServices;

use App\Models\Beer;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class BeerDataService
{
    /**
     * Undocumented function
     *
     * @return Beer[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Beer::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'beer', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $beerId
     * @return Beer
     */
    public static function get(int $beerId, $joinTables, $value)
    {
        $query = Beer::query();
        \joinTables($query, 'beer', $joinTables);
        return $query->findOrFail($beerId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Beer[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {

        $query = Beer::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'beer', $joinTables);
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
     * @return Beer
     */
    public static function insert(array $inputArray)
    {
        $beer = new Beer();
        foreach ($inputArray as $key => $value) {
            $beer[$key] = $value;
        }
        $beer->save();
        return $beer;
    }

    /**
     * Undocumented function
     *
     * @param integer $beerId
     * @param array $updateArray
     * @return Beer
     */
    public static function update(int $beerId, array $updateArray)
    {
        $beer = Beer::findOrFail($beerId);
        foreach ($updateArray as $key => $value) {
            $beer[$key] = $value;
        }

        $beer->save();
        return $beer;
    }

    /**
     * Undocumented function
     *
     * @param integer $beerId
     * @return void
     */
    public static function delete(int $beerId)
    {
        if (Beer::where('id', $beerId)->exists()) {
            Beer::destroy($beerId);
        } else {
            throw new ModelNotFoundException();
        }
    }
}

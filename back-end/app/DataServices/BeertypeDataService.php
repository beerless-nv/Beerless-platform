<?php

namespace App\DataServices;

use App\Models\Beerstyle;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class BeertypeDataService
{
    /**
     * Undocumented function
     *
     * @return Beerstyle[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Beerstyle::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'beertype', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $beertypeId
     * @return Beerstyle
     */
    public static function get(int $beertypeId, $joinTables, $value)
    {
        $query = Beerstyle::query();
        \joinTables($query, 'beertype', $joinTables);
        return $query->findOrFail($beertypeId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Beerstyle[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Beerstyle::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'beertype', $joinTables);
        \sortQuery($query, $sortOrder);
        foreach ($searchParams as $param) {
            if ($param['propName'] == 'name') {
                $query->whereRaw('LOWER(name) like ?', ['%' . strtolower($param['value']) . '%']);
            } else {
                $query->where($param['propName'], $param['operator'], $param['value']);
            }
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
     * @return Beerstyle
     */
    public static function insert(array $inputArray)
    {
        $beer = new Beerstyle();
        foreach ($inputArray as $key => $value) {
            $beer[$key] = $value;
        }
        $beer->save();
        return $beer;
    }

    /**
     * Undocumented function
     *
     * @param integer $beertypeId
     * @param array $updateArray
     * @return Beerstyle
     */
    public static function update(int $beertypeId, array $updateArray)
    {
        $beer = Beerstyle::findOrFail($beertypeId);
        foreach ($updateArray as $key => $value) {
            $beer[$key] = $value;
        }

        $beer->save();
        return $beer;
    }

    /**
     * Undocumented function
     *
     * @param integer $beertypeId
     * @return void
     */
    public static function delete(int $beertypeId)
    {
        if (Beerstyle::where('id', $beertypeId)->exists()) {
            Beerstyle::destroy($beertypeId);
        } else {
            throw new ModelNotFoundException();
        }

    }
}

<?php

namespace App\DataServices;

use App\Models\Beertype;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class BeertypeDataService
{
    /**
     * Undocumented function
     *
     * @return Beertype[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Beertype::query();
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
     * @return Beertype
     */
    public static function get(int $beertypeId, $joinTables, $value)
    {
        $query = Beertype::query();
        \joinTables($query, 'beertype', $joinTables);
        return $query->findOrFail($beertypeId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return Beertype[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = Beertype::query();
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
            return '';
        } else {
            return $query->get($value);
        }
    }

    /**
     * Undocumented function
     *
     * @param array $inputArray
     * @return Beertype
     */
    public static function insert(array $inputArray)
    {
        $beer = new Beertype();
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
     * @return Beertype
     */
    public static function update(int $beertypeId, array $updateArray)
    {
        $beer = Beertype::findOrFail($beertypeId);
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
        if (Beertype::where('id', $beertypeId)->exists()) {
            Beertype::destroy($beertypeId);
        } else {
            throw new ModelNotFoundException();
        }

    }
}

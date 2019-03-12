<?php
/**
 * Created by PhpStorm.
 * User: Tom Nuyts
 * Date: 12/03/2019
 * Time: 10:20
 */

namespace App\DataServices;


use App\Models\StyleTag;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StyleTagDataService
{
    /**
     * Undocumented function
     *
     * @return StyleTag[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = StyleTag::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'styleTag', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $styleTagId
     * @return StyleTag
     */
    public static function get(int $styleTagId, $joinTables, $value)
    {
        $query = StyleTag::query();
        \joinTables($query, 'styleTag', $joinTables);
        return $query->findOrFail($styleTagId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return StyleTag[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = StyleTag::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'styleTag', $joinTables);
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
     * @return StyleTag
     */
    public static function insert(array $inputArray)
    {
        $styleTag = new StyleTag();
        foreach ($inputArray as $key => $value) {
            $styleTag[$key] = $value;
        }
        $styleTag->save();
        return $styleTag;
    }

    /**
     * Undocumented function
     *
     * @param integer $styleTagId
     * @param array $updateArray
     * @return StyleTag
     */
    public static function update(int $styleTagId, array $updateArray)
    {
        $styleTag = StyleTag::findOrFail($styleTagId);
        foreach ($updateArray as $key => $value) {
            $styleTag[$key] = $value;
        }
        $styleTag->save();
        return $styleTag;
    }

    /**
     * Undocumented function
     *
     * @param integer $styleTagId
     * @return void
     */
    public static function delete(int $styleTagId)
    {
        if (StyleTag::where('id', $styleTagId)->exists()) {
            StyleTag::destroy($styleTagId);
        } else {
            throw new ModelNotFoundException();
        }

    }
}

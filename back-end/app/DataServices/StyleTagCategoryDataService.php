<?php
/**
 * Created by PhpStorm.
 * User: Tom Nuyts
 * Date: 12/03/2019
 * Time: 10:43
 */

namespace App\DataServices;


use App\Models\StyleTagCategory;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StyleTagCategoryDataService
{
    /**
     * Undocumented function
     *
     * @return StyleTagCategory[]
     */
    public static function getAll($joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = StyleTagCategory::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'styleTagCategory', $joinTables);
        \sortQuery($query, $sortOrder);
        return $query->get($value);
    }

    /**
     * Undocumented function
     *
     * @param integer $styleTagCategoryId
     * @return StyleTagCategory
     */
    public static function get(int $styleTagCategoryId, $joinTables, $value)
    {
        $query = StyleTagCategory::query();
        \joinTables($query, 'styleTagCategory', $joinTables);
        return $query->findOrFail($styleTagCategoryId, $value);
    }

    /**
     * Undocumented function
     *
     * @param array $searchParams
     * @return StyleTagCategory[]
     */
    public static function search(array $searchParams, $joinTables, $sortOrder, $limit, $offset, $value)
    {
        $query = StyleTagCategory::query();
        \limitQuery($query, $limit);
        \offsetQuery($query, $offset);
        \joinTables($query, 'styleTagCategory', $joinTables);
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
     * @return StyleTagCategory
     */
    public static function insert(array $inputArray)
    {
        $styleTagCategory = new StyleTagCategory();
        foreach ($inputArray as $key => $value) {
            $styleTagCategory[$key] = $value;
        }
        $styleTagCategory->save();
        return $styleTagCategory;
    }

    /**
     * Undocumented function
     *
     * @param integer $styleTagCategoryId
     * @param array $updateArray
     * @return StyleTagCategory
     */
    public static function update(int $styleTagCategoryId, array $updateArray)
    {
        $styleTagCategory = StyleTagCategory::findOrFail($styleTagCategoryId);
        foreach ($updateArray as $key => $value) {
            $styleTagCategory[$key] = $value;
        }
        $styleTagCategory->save();
        return $styleTagCategory;
    }

    /**
     * Undocumented function
     *
     * @param integer $styleTagCategoryId
     * @return void
     */
    public static function delete(int $styleTagCategoryId)
    {
        if (StyleTagCategory::where('id', $styleTagCategoryId)->exists()) {
            StyleTagCategory::destroy($styleTagCategoryId);
        } else {
            throw new ModelNotFoundException();
        }

    }
}

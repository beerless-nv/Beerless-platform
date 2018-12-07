<?php
function joinTables($query, string $tableOrg, $tables){
    if($tables != null){
        foreach($tables as $table){
            if(Schema::hasColumn($tableOrg, $table . 'Id')){
                $query->with($table);
            } else{
                throw new \InvalidArgumentException($table . 'Id does not exist in table ' . $tableOrg );
            }
        }
    }    
}

function sortQuery($query, $sortOrder){
    if($sortOrder != null){
        foreach($sortOrder as $key => $value){
            $query->orderBy($key, $value);
        }
    }
}

function limitQuery($query, $limit){
    if($limit != null){
        $query->take($limit);
    }
}

function offsetQuery($query, $offset){
    if($offset != null){
        $query->skip($offset);
    }
}
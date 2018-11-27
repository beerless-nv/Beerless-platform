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
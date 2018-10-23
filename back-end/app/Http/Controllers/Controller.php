<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function bierTest()
    {
        // Test database connection        
        return app('db')->select("SELECT * FROM Bier");
    }

    public function brouwerijTest()
    {
        // Test database connection        
        return app('db')->select("SELECT * FROM Brouwerij");
    }
}

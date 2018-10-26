<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Contains functions for returning data from table 'Brouwerij'
 */
class BrouwerijController extends BaseController
{
    /**
     * Returns a specific JSON object of type 'Brouwerij'
     * 
     * @param [int] $id
     * @return void
     */
    public function get($id) {
        return json_encode(app('db')->select('SELECT * FROM Brouwerij Where ID =' . $id)); //SQL injectie nog dichten
    }    

    /**
     * returns a JSON array of all columns in table 'Brouwerij'
     *
     * @return void
     */
    public function getAll() { 
        return json_encode(app('db')->select('SELECT * FROM Brouwerij')); 
    }

    // public function getAll_Contact() {
    //     return json_encode(app('db')->select('SELECT * FROM Brouwerij JOIN Contact ON Brouwerij.contactID = Contact.ID')); 
    // }
}
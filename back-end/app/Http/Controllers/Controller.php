<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function getBieren() { return json_encode(app('db')->select("SELECT * FROM Bier")); }

    public function getBrouwerijen($contactAanwezig = true) { 
        $return = "";
        if($contactAanwezig){
            $return = app('db')->select('SELECT * FROM Brouwerij JOIN Contact ON Brouwerij.contactID = Contact.ID');
        } else{
            $return = app('db')->select("SELECT * FROM Brouwerij");        
        }
        return json_encode($return); 
    }

    public function getContacten() { return json_encode(app('db')->select("SELECT * FROM Contact")); }
}

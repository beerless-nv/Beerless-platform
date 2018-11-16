import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleErrorMsg(msg){
    switch (msg) {
      case 'username_required':
        return "Gelieve een gebruikersnaam in te geven";
        break;
      case 'email_required':
        return "Gelieve een emailadres in te geven";
        break;
      case 'password_required':
        return "Gelieve een wachtwoord in te geven";
        break;
      case 'username_not_unique':
        return "Deze gebruikersnaam bestaat al";
        break;
      case 'email_not_unique':
        return "Dit emailadres is al in gebruik";
        break;
      case 'email_not_valid':
        return "Gelieve een geldig emailadres in te geven";
        break;  
      case 'password_incorrect':
        return "Wachtwoord is niet correct";
        break;
      case 'user_does_not_exist':
        return "Deze gebruiker bestaat niet";
        break;
    }
  }
}

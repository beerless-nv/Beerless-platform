import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    errorMessages = [
        {error: 'firstName_required', message: 'Vul een voornaam in!'},
        {error: 'lastName_required', message: 'Vul een achternaam in!'},
        {error: 'username_required', message: 'Vul een gebruikersnaam in!'},
        {error: 'username_not_unique', message: 'Deze gebruikersnaam bestaat al!'},
        {error: 'email_required', message: 'Vul een e-mailadres in!'},
        {error: 'email_not_valid', message: 'Vul een geldig e-mailadres in!'},
        {error: 'email_not_unique', message: 'Dit e-mailadres is al in gebruik!'},
        {error: 'password_required', message: 'Vul een wachtwoord in!'},
    ];

    messageRegister$: BehaviorSubject<Array<string>> = new BehaviorSubject(null);

    constructor() {
    }

    handleErrorMsg(errorMessages) {
        const errorMessageArray = [];
        if (errorMessages != null) {
            for (let i = 0; i < errorMessages.length; i++) {
                for (let j = 0; j < this.errorMessages.length; j++) {
                    if (errorMessages[i] === this.errorMessages[j].error) {
                        errorMessageArray[j] = this.errorMessages[j].message;
                    }
                }
            }
        }

        this.messageRegister$.next(errorMessageArray);
    }
}

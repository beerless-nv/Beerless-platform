import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'beerless-cookie-popup',
    templateUrl: './cookie-popup.component.html',
    styleUrls: ['./cookie-popup.component.scss']
})
export class CookiePopupComponent implements OnInit {

    accepted = 'false';

    constructor(private cookieService: CookieService) {
    }

    ngOnInit() {
        this.accepted = this.cookieService.get('cookieConsent');
    }

    consent() {
        // expiration year
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        const expireDate = new Date(year + 5, month, day);

        document.cookie = 'cookieConsent=true;expires=' + expireDate + ';domain=' + environment.domain + ';path=/';

        this.accepted = 'true';
    }

}

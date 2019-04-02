import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';


@Component({
    selector: 'app-age-verification',
    templateUrl: './age-verification.component.html',
    styles: []
})
export class AgeVerificationComponent implements OnInit {

    legalAge = null;
    imageUrl = environment.imageURL;

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, private cookieService: CookieService, private cdref: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    answer(response: string) {
        if (response === 'yes') {
            // expiration year
            const d = new Date();
            const year = d.getFullYear();
            const month = d.getMonth();
            const day = d.getDate();
            const c = new Date(year + 5, month, day);


            this.cookieService.set('legalAge', 'true', c);
            this.activeModal.close();
        } else if (response === 'no') {
            this.legalAge = false;
        }
    }
}

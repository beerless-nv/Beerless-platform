import {Injectable} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {SocialCredentialComponent} from '../../shared/platform-components/modals/social-credential/social-credential/social-credential.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(private modalService: NgbModal) {
    }

    showSocialCredential() {
        // if users profile has social username (facebook or google), show popup to change username and password
        const options: NgbModalOptions = {
            centered: true,
            backdrop: 'static',
            windowClass: 'white-modal',
            keyboard: false,
            size: 'lg'
        };

        this.modalService.open(SocialCredentialComponent, options);
    }
}

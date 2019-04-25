import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'beerless-ie-warning',
    templateUrl: './ie-warning.component.html',
    styles: []
})
export class IeWarningComponent implements OnInit {

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

    close() {
        this.activeModal.close();
    }

}

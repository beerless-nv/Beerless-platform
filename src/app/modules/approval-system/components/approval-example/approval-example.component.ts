import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ApprovalSystemService} from '../../shared/approval-system.service';

@Component({
    selector: 'app-approval-example',
    templateUrl: './approval-example.component.html',
    styles: []
})
export class ApprovalExampleComponent implements OnInit {
    modalRef: BsModalRef;
    modalConfig = {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-dialog-centered confirm-modal'
    };
    entry: any;
    original: any;

    constructor(private modalService: BsModalService, private route: ActivatedRoute, private approvalSystemService: ApprovalSystemService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params.entry !== undefined) {
                this.getEntry(params.entry);
            }
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.modalConfig);
    }

    getEntry(id) {
        this.approvalSystemService.getEntry(id).subscribe(entry => {
            this.entry = entry;
            if (this.entry.originalId !== 0) {
                this.approvalSystemService.getEntry(this.entry.originalId).subscribe(original => {
                    this.original = original;
                });
            } else {
                this.original = null;
            }
        });

    }

    acceptEntry(id) {
        this.modalRef.hide();
        this.approvalSystemService.acceptEntry(this.entry.id, this.entry);
    }

    declineEntry(id) {
        console.log('decline entry');

        this.modalRef.hide();
        this.approvalSystemService.declineEntry(this.entry.id, this.entry);

    }

    cancel() {
        this.modalRef.hide();
    }
}

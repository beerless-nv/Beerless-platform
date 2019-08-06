import {Component, OnInit} from '@angular/core';
import {ApprovalSystemService} from '../../shared/approval-system.service';

@Component({
    selector: 'app-approval-system-index',
    templateUrl: './approval-system-index.component.html',
    styles: []
})
export class ApprovalSystemIndexComponent implements OnInit {

    entries;

    constructor(private approvalSystemService: ApprovalSystemService) {
    }

    ngOnInit() {
        this.getEntries();
    }

    getEntries() {
        this.entries = this.approvalSystemService.getEntries();
    }
}

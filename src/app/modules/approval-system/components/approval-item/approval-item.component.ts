import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-approval-item',
    templateUrl: './approval-item.component.html',
    styles: []
})
export class ApprovalItemComponent implements OnInit, OnChanges {

    @Input() entry: any;
    active = false;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.route.queryParams.subscribe(params => {
            this.active = +params.entry === this.entry.id;
        });
    }

    showEntry() {
        this.router.navigate(['admin/approval-system'], {queryParams: {entry: this.entry.id}});
    }
}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

const diff = require('deep-diff').diff;

@Component({
    selector: 'app-approval-example-item',
    templateUrl: './approval-example-item.component.html',
    styles: []
})
export class ApprovalExampleItemComponent implements OnInit, OnChanges {

    @Input() entry: any = null;
    @Input() original: any = null;
    hiddenProperties = ['id', 'activityTypes', 'originalId', 'statusId', 'editors', 'timestampCreated', 'timestampUpdated'];
    objectProperties = ['breweries', 'styleTags'];
    changedProperties = [];

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getChanges();
    }

    getChanges() {
        if (this.original) {
            const entry = this.entry;
            const original = this.original;

            this.changedProperties = [];

            this.hiddenProperties.forEach(property => {
                delete entry[property];
                delete original[property];
            });

            const differences = diff(this.original, this.entry);
            differences.map(difference => {
                this.changedProperties.push(difference.path[0]);
            });
        }
    }

}

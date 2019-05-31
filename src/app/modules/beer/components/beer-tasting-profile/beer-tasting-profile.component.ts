import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-beer-tasting-profile',
    templateUrl: './beer-tasting-profile.component.html',
    styles: []
})
export class BeerTastingProfileComponent implements OnInit, OnChanges {

    @Input() tastingprofiles: Array<any>;

    labels = [];
    datasets = [{
        label: 'Community',
        data: [],
        backgroundColor: 'rgba(249, 176, 84, 0.2)',
        borderColor: '#f9b054',
        borderWidth: 1
    }];
    options = {
        pointRadius: 3,
        pointHoverRadius: 3,
        responsive: true,
        maintainAspectRatio: false,
        scale: {
            ticks: {
                max: 5,
                min: 0
            }
        },
        events: ['click']
    };

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // this.labels = ['test', 'test', 'test', 'test', 'test', 'test'];
        for (const tastingprofilesKey in this.tastingprofiles) {
            delete this.tastingprofiles[tastingprofilesKey]['ID'];
            delete this.tastingprofiles[tastingprofilesKey]['beerId'];

            for (const tastingprofileKey in this.tastingprofiles[tastingprofilesKey]) {
                this.labels.push(tastingprofileKey);
                this.datasets[0].data.push(this.tastingprofiles[tastingprofilesKey][tastingprofileKey]);
            }
        }
    }

}

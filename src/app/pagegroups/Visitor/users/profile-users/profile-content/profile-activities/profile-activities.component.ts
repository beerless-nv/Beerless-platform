import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivitiesService} from '../../../../../../_services/activities.service';
import {environment} from "../../../../../../../environments/environment";

@Component({
    selector: 'app-profile-activities',
    templateUrl: './profile-activities.component.html',
    styles: []
})
export class ProfileActivitiesComponent implements OnInit, OnChanges {

    @Input() user: any;
    activities;
    environment = environment;

    constructor(private activitiesService: ActivitiesService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.user.currentValue != null) {
            this.activitiesService.getAllActivitiesByUserId(changes.user.currentValue.ID).then(data => {
                this.activities = data;
            });
        }
    }
}

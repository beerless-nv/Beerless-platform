import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivityService} from '../../../shared/activity.service';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-profile-activities',
    templateUrl: './profile-activities.component.html',
    styles: []
})
export class ProfileActivitiesComponent implements OnInit, OnChanges {

    @Input() user: any;
    environment = environment;
    activities$: Observable<any>;

    constructor(private activityService: ActivityService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.user) {
            this.activities$ = this.activityService.getAllActivitiesByUserId(this.user.id, 5);
        }
    }
}

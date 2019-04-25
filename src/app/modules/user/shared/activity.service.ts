import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    readonly urlActivities = environment.backend + 'activities';

    constructor(private http: HttpClient) {
    }

    getAllActivitiesByUserId(userId) {
        const params = new HttpParams()
            .set('joinTables', 'activityType,member,article,beer,brewery');
        return this.http.post(this.urlActivities + '/search', {
            searchParams: [{
                propName: 'userID',
                value: userId,
                operator: '='
            }]
        }, {params})
            .toPromise()
            .then(data => {
                return data['activities'];
            })
            .catch(error => {
                console.log(error);
            });
    }
}

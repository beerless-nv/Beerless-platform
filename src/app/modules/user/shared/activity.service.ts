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

    getAllActivitiesByUserId(userId: number, limit: number) {
        const params = new HttpParams()
            .set('filter', '{"where":{"userId":' + userId + '},"include":["beer","brewery","article"],"limit":' + limit + '}');

        return this.http.get(this.urlActivities, {params});
    }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BierenService {

    readonly urlGetBierenByNaam = environment.backend + 'bieren/getByNaam';
    readonly urlGetAllBieren = environment.backend + 'bieren/getAll';
    readonly urlInsertBier = environment.backend + 'bieren/insert';

    constructor(private http: HttpClient) {
    }

    getBierenByNaam(naam): Observable<any> {
        const params = new HttpParams()
            .set('naam', naam);

        return this.http.get(this.urlGetBierenByNaam, {params})
            .pipe(
                tap(req => console.log('get-request', req)),
                catchError(
                    (error) => {
                        console.log(error);
                        alert(error.message);
                        return EMPTY;
                    }),
                share()
            );
    }

    insertBier(bier) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        const params = new HttpParams()
            .set('naam', bier.naam)
            .set('alcoholpercentage', bier.abv)
            .set('ibu', bier.ibu)
            .set('ebc', bier.ebc)
            .set('temperatuur', bier.temperatuur)
            .set('gisting', bier.gisting)
            .set('glas', 'test')
            .set('afbeelding', 'test')
            .set('seizoen', bier.seizoen)
            .set('sinds', bier.sinds)
            .set('brouwerijID', bier.brouwerij)
            .set('biersoortID', bier.biersoort);

        return this.http.post(this.urlInsertBier,
            {
                naam: bier.naam,
                ibu: bier.ibu
            })
            .subscribe(
                req => {
                    console.log(req);
                },
                err => {
                    console.log('Error occured', err);
                }
            );
        /*return this.http.post(this.urlInsertBier, bier)
            .subscribe(
                req => {
                    console.log(req);
                },
                err => {
                    console.log('Error occured');
                }
            );*/
    }

    // naam, alcoholpercentage, ibu, ebc, temperatuur, gisting, glas, afbeelding, seizoen, sinds, brouwerijID, biersoortID
}

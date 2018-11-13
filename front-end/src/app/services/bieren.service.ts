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
        return this.http.post(this.urlInsertBier,
            {
                naam: bier.naam,
                alcoholpercentage: bier.abv,
                ibu: bier.ibu,
                ebc: bier.ebc,
                temperatuur: bier.temperatuur,
                gisting: bier.gisting,
                glas: '',
                afbeelding: '',
                seizoen: bier.seizoen,
                sinds: bier.sinds,
                brouwerijID: bier.brouwerij,
                biersoortID: bier.biersoort
            })
            .subscribe(
                req => {
                    console.log(req);
                },
                err => {
                    console.log('Error occured', err);
                }
            );
    }
}

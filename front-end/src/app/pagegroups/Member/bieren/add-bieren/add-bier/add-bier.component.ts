import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BrouwerijenService} from '../../../../../services/brouwerijen.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BierenService} from '../../../../../services/bieren.service';
import {BiersoortenService} from '../../../../../services/biersoorten.service';

@Component({
    selector: 'app-add-bier',
    templateUrl: './add-bier.component.html',
    styles: []
})
export class AddBierComponent implements OnInit {

    brouwerijenList: string[] = [];
    brouwerijenByNaamList: string[] = [];
    brouwerijenByNaamList$: Observable<any>;

    biersoortenList: string[] = [];

    dateToday = new Date();
    openBrouwerijItems$: Observable<any>;
    brouwerijNaam$: Observable<any>;
    bierNaam$: Observable<any>;
    bierNaam = '';

    maxLengthTextarea = 800;

    form: FormGroup;

    constructor(
        private brouwerijenService: BrouwerijenService,
        private bierenService: BierenService,
        private biersoortenService: BiersoortenService,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.getAllBiersoorten();
        this.getAllBrouwerijen();

        // query parameter ophalen
        this.route.queryParamMap.subscribe(queryParams => {
            this.bierNaam = queryParams.get('name');
        });

        // form
        // this.form = new FormGroup({
        //     naam: new FormControl(this.bierNaam, Validators.required),
        //     brouwerij: new FormControl('', Validators.required),
        //     biersoort: new FormControl(0, [Validators.required, Validators.min(1)]),
        //     gisting: new FormControl(0, [Validators.required, Validators.min(1)]),
        //     omschrijving: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(this.maxLengthTextarea)]),
        //     abv: new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')]),
        //     ibu: new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*$')]),
        //     afbeelding: new FormControl(''),
        //     ebc: new FormControl('', Validators.pattern('^[1-9]\\d*$')),
        //     temperatuur: new FormControl('', Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')),
        //     seizoen: new FormControl(0, Validators.min(1)),
        //     sinds: new FormControl('', Validators.pattern('^[1-9]\\d*$'))
        // });
        this.form = new FormGroup({
            naam: new FormControl(this.bierNaam, Validators.required),
            brouwerij: new FormControl(''),
            biersoort: new FormControl(0),
            gisting: new FormControl(0),
            omschrijving: new FormControl(''),
            abv: new FormControl(''),
            ibu: new FormControl(''),
            afbeelding: new FormControl(''),
            ebc: new FormControl(''),
            temperatuur: new FormControl(''),
            seizoen: new FormControl(0),
            sinds: new FormControl('')
        });
    }

    //
    // Functies bieren
    //

    addBier() {
        // brouwerijID doorgeven
        if (this.brouwerijNaam$ != null) {
            this.brouwerijNaam$.subscribe(val => this.form.value.brouwerij = val.id);
        }

        // this.bierNaam$ = of(this.form.value);

        console.log(this.form.value);

        this.bierenService.insertBier(this.form.value);
    }

    //
    // Functies biersoorten
    //

    getAllBiersoorten() {
        this.biersoortenService.getAllBiersoorten().subscribe(val => this.biersoortenList = val);
    }

    //
    // Functies brouwerijen
    //

    setBrouwerijNaam(brouwerij) {
        this.brouwerijNaam$ = of(brouwerij);
        console.log(brouwerij);
        this.brouwerijNaam$.subscribe(val => this.form.controls['brouwerij'].setValue(val.naam));
    }

    getAllBrouwerijen() {
        this.brouwerijenService.getAllBrouwerijen().subscribe(val => this.brouwerijenList = val);
    }

    getBrouwerijenByNaam(naam) {
        if (naam !== '') {
            this.openBrouwerijItems$ = of(true);
            this.brouwerijenByNaamList = [];

            for (const x in this.brouwerijenList) {
                if ((this.brouwerijenList[x]['naam'].toLowerCase()).match(naam.toLowerCase())) {
                    this.brouwerijenByNaamList.push(this.brouwerijenList[x]);
                }
            }
        } else {
            this.brouwerijenByNaamList = [];
            this.openBrouwerijItems$ = of(false);
        }
        this.brouwerijenByNaamList$ = of(this.brouwerijenByNaamList);
    }

    hideBrouwerijDropdown() {
        setTimeout(() => {
            this.openBrouwerijItems$ = of(false);
        }, 200);
    }

    showBrouwerijDropdown() {
        this.openBrouwerijItems$ = of(true);
    }
}

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


    isCollapsed = true;
    maxLengthTextarea = 800;

    form: FormGroup;
    selectedImage = null;
    imageName = null;

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
        // imageName aanmaken
        let brouwerijNaam;
        let bierNaam;

        this.brouwerijNaam$.subscribe(val => brouwerijNaam = val.naam.replace(/[^a-z0-9_ ]/gi, '').toLowerCase());
        bierNaam = this.form.value.naam.replace(/[^a-z0-9_ ]/gi, '').toLowerCase();

        this.imageName = brouwerijNaam + '-' + bierNaam + '.jpg';
        this.imageName = this.imageName.replace(/\s+/g, '-');

        // imageNaam doorgeven
        this.form.value.afbeelding = this.imageName;

        // brouwerijID doorgeven
        if (this.brouwerijNaam$ != null) {
            this.brouwerijNaam$.subscribe(val => this.form.value.brouwerij = val.id);
            // console.log('werkt');
        } else {
            this.brouwerijenService.getBrouwerijenByNaam(this.form.value.brouwerij).subscribe(val => this.form.value.brouwerij = val.id);
            console.log(this.brouwerijNaam$);
            // this.brouwerijNaam$.subscribe(val => this.form.value.brouwerij = this.brouwerijNaam$['id']);
            // this.addBier();
        }


        this.bierenService.insertBier(this.form.value);
        // this.onUpload(this.imageName);
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

    deleteBrouwerijNaam() {
        this.brouwerijNaam$ = of('');

        // enable brouwerij input
        this.form.controls['brouwerij'].enable();
        this.isCollapsed = true;
    }

    setBrouwerijNaam(brouwerij) {
        this.brouwerijNaam$ = of(brouwerij);
        console.log(brouwerij);
        this.brouwerijNaam$.subscribe(val => this.form.controls['brouwerij'].setValue(val.naam));

        // disable brouwerij input
        this.form.controls['brouwerij'].disable();
        this.isCollapsed = false;
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
        }, 400);
    }

    showBrouwerijDropdown() {
        this.openBrouwerijItems$ = of(true);
    }

    //
    // File upload
    //
    onFileSelected(event) {
        this.selectedImage = event.target.files[0];
    }

    onUpload(imageName) {
        console.log(imageName);
        console.log(this.selectedImage);
        this.bierenService.uploadImageBier(this.selectedImage, imageName);
    }
}

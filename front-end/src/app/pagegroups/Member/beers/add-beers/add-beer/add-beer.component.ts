import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BreweriesService} from '../../../../../services/breweries.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BeersService} from '../../../../../services/beers.service';
import {BeertypesService} from '../../../../../services/beertypes.service';

@Component({
    selector: 'app-add-beer',
    templateUrl: './add-beer.component.html',
    styles: []
})
export class AddBeerComponent implements OnInit {

    breweriesList: string[] = [];
    breweriesByNameList: string[] = [];
    breweriesByNameList$: Observable<any>;

    beertypesList: string[] = [];

    dateToday = new Date();
    openBreweryItems$: Observable<any>;
    breweryName$: Observable<any>;
    beerName$: Observable<any>;
    beerName = '';


    isCollapsed = true;
    maxLengthTextarea = 800;

    form: FormGroup;
    selectedImage = null;
    selectedLogo = null;

    constructor(
        private breweriesService: BreweriesService,
        private beersService: BeersService,
        private beertypesService: BeertypesService,
        private route: ActivatedRoute,
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.getAllBeertypes();
        this.getAllBreweries();

        // query parameter ophalen
        this.route.queryParamMap.subscribe(queryParams => {
            this.beerName = queryParams.get('name');
        });

        // form
        this.form = new FormGroup({
            name: new FormControl(this.beerName, Validators.required),
            brewery: new FormControl('', Validators.required),
            beertype: new FormControl(0, [Validators.required, Validators.min(1)]),
            fermentation: new FormControl(0, [Validators.required, Validators.min(1)]),
            description: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(this.maxLengthTextarea)]),
            abv: new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')]),
            ibu: new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*$')]),
            logo: new FormControl('', Validators.required),
            picture: new FormControl('', Validators.required),
            ebc: new FormControl(''),
            temperature: new FormControl(''),
            season: new FormControl(0),
            since: new FormControl('')
        });
        // this.form = new FormGroup({
        //     name: new FormControl(this.beerName, Validators.required),
        //     brewery: new FormControl(''),
        //     beertype: new FormControl(0),
        //     gisting: new FormControl(0),
        //     omschrijving: new FormControl(''),
        //     abv: new FormControl(''),
        //     ibu: new FormControl(''),
        //     logo: new FormControl(''),
        //     image: new FormControl(''),
        //     ebc: new FormControl(''),
        //     temperatuur: new FormControl(''),
        //     seizoen: new FormControl(0),
        //     sinds: new FormControl('')
        // });
    }

    //
    // Functies beers
    //

    addBeer() {
        // imageName en imagePath aanmaken
        let breweryName;
        let beerName;
        let imageName;
        let imagePath;
        let logoName;
        let logoPath;

        this.breweryName$.subscribe(val => breweryName = val.name.replace(/[^a-z0-9_ ]/gi, '').toLowerCase());
        beerName = this.form.value.name.replace(/[^a-z0-9_ ]/gi, '').toLowerCase();

        let fileName = breweryName + '-' + beerName + '.jpg';
        fileName = fileName.replace(/\s+/g, '-');

        imageName = 'image-' + fileName;
        logoName = 'logo-' + fileName;

        imagePath = 'image/';
        logoPath = 'logo/';


        // imageName doorgeven
        this.form.value.image = imageName;
        this.form.value.logo = logoName;

        // breweryID doorgeven
        if (this.breweryName$ != null) {
            this.breweryName$.subscribe(val => this.form.value.brewery = val.id);
            // console.log('werkt');
        } else {
            this.breweriesService.getBreweriesByName(this.form.value.brewery).subscribe(val => this.form.value.brewery = val.id);
            console.log(this.breweryName$);
            // this.breweryName$.subscribe(val => this.form.value.brewery = this.breweryName$['id']);
            // this.addBeer();
        }


        this.beersService.insertBeer(this.form.value);
        this.onUpload(this.selectedImage, imageName, imagePath);
        this.onUpload(this.selectedLogo, logoName, logoPath);

        // redirect naar beers index page
        this.router.navigate(['beers'], {queryParams: {name: this.beerName}});
    }

    //
    // Functies beertypes
    //

    getAllBeertypes() {
        this.beertypesService.getAllBeertypes().subscribe(val => this.beertypesList = val);
    }

    //
    // Functies breweries
    //

    deleteBreweryName() {
        this.breweryName$ = of('');

        // enable brewery input
        this.form.controls['brewery'].enable();
        this.isCollapsed = true;
    }

    setBreweryName(brewery) {
        this.breweryName$ = of(brewery);
        console.log(brewery);
        this.breweryName$.subscribe(val => this.form.controls['brewery'].setValue(val.name));

        // disable brewery input
        this.form.controls['brewery'].disable();
        this.isCollapsed = false;
    }

    getAllBreweries() {
        this.breweriesService.getAllBreweries().subscribe(val => this.breweriesList = val);
    }

    getBreweriesByName(name) {
        if (name !== '') {
            this.openBreweryItems$ = of(true);
            this.breweriesByNameList = [];

            for (const x in this.breweriesList) {
                if ((this.breweriesList[x]['name'].toLowerCase()).match(name.toLowerCase())) {
                    this.breweriesByNameList.push(this.breweriesList[x]);
                }
            }
        } else {
            this.breweriesByNameList = [];
            this.openBreweryItems$ = of(false);
        }
        this.breweriesByNameList$ = of(this.breweriesByNameList);
    }

    hideBreweryDropdown() {
        setTimeout(() => {
            this.openBreweryItems$ = of(false);
        }, 400);
    }

    showBreweryDropdown() {
        this.openBreweryItems$ = of(true);
    }

    //
    // File upload
    //
    onImageSelected(event) {
        this.selectedImage = event.target.files[0];
    }

    onLogoSelected(event) {
        this.selectedLogo = event.target.files[0];
    }

    onUpload(selectedImage, imageName, imagePath) {
        console.log(imageName);
        console.log(selectedImage);
        this.beersService.uploadImageBeer(selectedImage, imageName, imagePath);
    }
}

import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../../../shared/components/error/error.service';
import {TastingprofileService} from '../../shared/tastingprofile.service';
@Component({
    selector: 'app-add-tastingprofile',
    templateUrl: './add-tastingprofile.component.html',
    styles: []
})
export class AddTastingprofileComponent implements OnInit {

    labels = ['malty', 'sweet', 'sour', 'hoppy', 'bitter', 'fruity'];
    datasets = [{
        data: [0, 0, 0, 0, 0, 0],
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
        legend: {
            display: false
        },
    };
    tastingprofileForm: FormGroup;
    beerId: number;
    serverSideMessages: any;

    constructor(private tastingprofileService: TastingprofileService, private router: Router, private route: ActivatedRoute, private errorService: ErrorService, private location: Location) {
    }

    ngOnInit() {
        this.errorService.errorMessages$.subscribe(data => {
            this.serverSideMessages = {type: 'error', data: data};
        });

        this.tastingprofileForm = new FormGroup({
            malty: new FormControl(0),
            sweet: new FormControl(0),
            sour: new FormControl(0),
            hoppy: new FormControl(0),
            bitter: new FormControl(0),
            fruity: new FormControl(0)
        });

        this.route.params.subscribe(params => {
            this.beerId = params['id'];
        });
    }

    addTastingprofile() {
        if (this.tastingprofileForm.valid) {
            this.tastingprofileForm.value['beerId'] = this.beerId;
            this.tastingprofileService.addTastingprofile(this.tastingprofileForm.value)
                .then(data => {
                    if (data === true) {
                        this.serverSideMessages = {type: 'success', data: ['You\'ve successfully created a new tasting profile!']};
                        setTimeout(() => {
                            this.location.back();
                        }, 1500);
                    }
                });
        }
    }

    changeValue(sliderValue, sliderName) {
        const datasetsArray = this.datasets;
        const arrayPosition = this.labels.indexOf(sliderName);
        datasetsArray[0].data[arrayPosition] = sliderValue.value;
        this.datasets = datasetsArray.slice(0);
    }

}

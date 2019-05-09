import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../core/user/user.service';
import {SignUpService} from '../../../shared/sign-up.service';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styles: []
})
export class ConfirmEmailComponent implements OnInit {

    user: any;
    success: boolean;

    constructor(private route: ActivatedRoute, private userService: UserService, private signUpService: SignUpService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.userService.getUserById(params['uid'])
                .then(user => {
                    this.user = user;
                });

            this.signUpService.verifyEmail(params['uid'], params['token'])
                .then(data => {
                    this.success = data;
                });
        });
    }

}

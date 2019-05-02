import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-brewerybeerprofile',
  templateUrl: './brewerybeerprofile.component.html',
  styles: []
})
export class BrewerybeerprofileComponent implements OnInit {

  @Input() item: any;
  environment = environment;
  
  constructor() { }

  ngOnInit() {
  }

}

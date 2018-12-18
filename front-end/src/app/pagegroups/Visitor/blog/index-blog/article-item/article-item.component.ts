import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html'
})
export class ArticleItemComponent implements OnInit {

  @Input() user: any;
  @Input() article: any;
  picture;

  constructor() { }

  ngOnInit() {
    // this.picture = this.user.picture || 'https://avatars.dicebear.com/v2/identicon/' + this.user.firstname + this.user.lastname + '.svg';
  }

}

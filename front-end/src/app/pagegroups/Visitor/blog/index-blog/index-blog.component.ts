import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-index-blog',
    templateUrl: './index-blog.component.html',
    styles: []
})
export class IndexBlogComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    getBlogsByName(name) {
        console.log(name);
    }
}

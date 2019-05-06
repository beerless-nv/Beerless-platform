import {Component} from '@angular/core';

export const PREFIX = '--';

@Component({
    selector: 'beerless-sass-helper',
    template: '<div></div>'
})
export class SassHelperComponent {

    constructor() {

    }

    // Read the custom property of body section with given name:
    readProperty(name: string): string {
        const bodyStyles = window.getComputedStyle(document.body);
        return bodyStyles.getPropertyValue(PREFIX + name);
    }
}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    //backend: 'http://localhost/Beerless-platform/back-end/public/api/',
    backend: 'http://localhost/api/',
    beerImageURL: 'http://assets.beerless.be/assets/images/beer/image/',
    beerLogoURL: 'http://assets.beerless.be/assets/images/beer/logo/',
    breweryLogoURL: 'http://assets.beerless.be/assets/images/brewery/logo/',
    userPictureURL: 'http://assets.beerless.be/assets/images/user/picture/',
    articlePictureURL: 'http://assets.beerless.be/assets/images/article/hero-picture/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

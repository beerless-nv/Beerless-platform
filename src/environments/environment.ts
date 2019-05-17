// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    domain: 'localhost',
    backend: 'http://localhost:3000/api/',
    backendBaseUrl: 'http://localhost:3000/',
    imageURL: 'https://assets.beerless.be/images/',
    mapsAPIKey: 'AIzaSyBDxPBARHK7z7XuEi2n9XTWhsxv630C6eo',
    appURL: 'http://localhost:4200/',
    websiteURL: 'http://localhost:4201/',
    articlePictureURL: 'https://assets.beerless.be/assets/images/article/hero-picture/',

    // chatbot
    chatbotApiUrl: 'https://api.oswald.ai/api/v1',
    chatbotId: '5c909b61ccc52e00050a6e76',
    chatbotAccessToken: 'bab11155-47cd-498f-9b97-f04ec43bdad7'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

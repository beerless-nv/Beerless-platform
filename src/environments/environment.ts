// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    backend: 'http://localhost:3000/api/',
    imageURL: 'https://assets.beerless.be/images/',
    mapsAPIKey: 'AIzaSyBDxPBARHK7z7XuEi2n9XTWhsxv630C6eo',
    appURL: 'http://localhost:4200/',
    websiteURL: 'http://localhost:4201/',
    articlePictureURL: 'https://assets.beerless.be/assets/images/article/hero-picture/',

    // chatbot
    chatbotApiUrl: 'https://api-acc.oswald.ai/api/v1',
    chatbotId: '5cb49d7d4648730006815d8d',
    chatbotAccessToken: 'XiPS5w7sT7FEeWI1qFqbI5AmsDRW7ShhgBm2YUEo9zdf55112eVhoaGlQEv3zret'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

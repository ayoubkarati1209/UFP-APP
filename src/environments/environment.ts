// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  configFile: 'assets/config/config.dev.json',
 firebase:{
    apiKey: "AIzaSyDawvTqfuYIkGIbkGky_NgMWN0MpG8kuaQ",
    authDomain: "ufp-spacs.firebaseapp.com",
    projectId: "ufp-spacs",
    storageBucket: "ufp-spacs.appspot.com",
    messagingSenderId: "722744551547",
    appId: "1:722744551547:web:9ac91809ed4b051b6b5ade"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: true,

  //apiEndpoint:"http://172.16.16.28:8080/payroll/"
//apiEndpoint: "http://localhost:4444/"
//apiEndpoint: "http://192.168.1.225:8080/payroll/"
//apiEndpoint: "http://192.168.1.7:8080/payrolloutsource/"
// apiEndpoint: "http://192.168.0.133:5555/"

// apiEndpoint:"http://localhost:8080/payroll/"
 
// };


//old one
const { urls } = require("../assets/config.json");
// import {urls} from '../assets/json/urls.json'

export const environment = {
  production: true,
  apiEndpoint: urls.baseURL
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: 'http://localhost:4000/',
  apiUrl: 'https://app-intranetapi-dev-001.azurewebsites.net/',
  blobStorageAccount: 'redepstorage',
  appInsights: {
    instrumentationKey: '24954940-b78e-4fda-9d93-e9f7d1f73451',
    connectionString:
      'InstrumentationKey=24954940-b78e-4fda-9d93-e9f7d1f73451;IngestionEndpoint=https://centralus-2.in.applicationinsights.azure.com/;LiveEndpoint=https://centralus.livediagnostics.monitor.azure.com/',
  },
  defaultUserImage:
    'https://primefaces.org/primeng/showcase/assets/showcase/images/demo/avatar/onyamalimba.png',
  defaultImage: 'assets/images/user.png',
  azure: {
    clientId: '05d4e461-6afa-4ad4-8c6a-e966e3b07e26',
    tenantId: '5b1d8b4e-bb2d-45b0-b724-6675fd7e1d51',
  },
  integracaoFormsRecognizer: false,
  integracaoSignalR: false,
  Google_Analytics_Tag: 'G-CCQJEBXP6V',
  telephone: 'tel:+351214124100',
  instagram: 'https://www.instagram.com/reditus_a/',
  facebook: 'https://www.facebook.com/ReditusConsulting',
  linkedin: 'https://pt.linkedin.com/company/reditusconsulting',
  email: 'geral@reditus.pt'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

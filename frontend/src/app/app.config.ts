import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// 1. Importe o withFetch junto com o provideHttpClient
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 2. Chame o withFetch() dentro do provideHttpClient()
    provideHttpClient(withFetch())
  ]
};

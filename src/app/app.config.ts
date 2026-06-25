import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { InitService } from './core/services/init.service';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withViewTransitions()),
    provideHttpClient(),
    provideAppInitializer(async()=>{
      const initService=inject(InitService)
      try{
        return lastValueFrom(initService.init())
      }finally{
        const splashScreen=document.getElementById('initial-splash');
        if(splashScreen){
          splashScreen.remove()
        }
      }
    })
  ]
};

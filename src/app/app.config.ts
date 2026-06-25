import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InitService } from './core/services/init.service';
import { lastValueFrom } from 'rxjs';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withViewTransitions()),
    provideHttpClient(withInterceptors([errorInterceptor])),
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

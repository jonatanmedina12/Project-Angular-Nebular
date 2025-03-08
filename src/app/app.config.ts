// app.config.ts
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Importaciones de Nebular
import { 
  NbThemeModule, 
  NbLayoutModule, 
  NbSidebarModule, 
  NbMenuModule,
  NbCardModule, 
  NbIconModule, 
  NbListModule, 
  NbButtonModule 
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Importación de Nebular Auth
import { 
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
  NbTokenStorage,
  NbTokenLocalStorage
} from '@nebular/auth';

// Importar nuestro servicio de almacenamiento personalizado

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), 
    // Mantenemos SSR, pero con nuestra implementación personalizada de almacenamiento
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    
    // Proveedor para nuestro servicio de almacenamiento personalizado
    
    importProvidersFrom(
      // Módulos básicos de Nebular
      NbThemeModule.forRoot({ name: 'default' }),
      NbLayoutModule,
      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
      NbEvaIconsModule,
      NbCardModule,
      NbIconModule,
      NbListModule,
      NbButtonModule,
      
      // Configuración del módulo de autenticación de Nebular
      NbAuthModule.forRoot({
        strategies: [
          NbPasswordAuthStrategy.setup({
            name: 'email',
            token: {
              class: NbAuthJWTToken,
              key: 'token',
            },
            baseEndpoint: 'http://localhost:3000/api',
            login: {
              endpoint: '/auth/login',
              method: 'post',
            },
            register: {
              endpoint: '/auth/register',
              method: 'post',
            },
            logout: {
              endpoint: '/auth/logout',
              method: 'post',
            },
            requestPass: {
              endpoint: '/auth/request-pass',
              method: 'post',
            },
            resetPass: {
              endpoint: '/auth/reset-pass',
              method: 'post',
            },
          }),
        ],
        forms: {},
      }),
    )
  ]
};
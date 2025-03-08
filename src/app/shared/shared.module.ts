import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import { 
  NbThemeModule, 
  NbLayoutModule, 
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbSidebarModule,
  NbMenuModule,
  NbUserModule,
  NbContextMenuModule,
  NbActionsModule,
  NbSearchModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbUserModule,
    NbContextMenuModule,
    NbActionsModule,
    NbSearchModule,
      // Autenticación de Nebular
      NbAuthModule.forRoot({
        strategies: [
          NbPasswordAuthStrategy.setup({
            name: 'email',
            baseEndpoint: 'http://localhost:3000/api',
            login: {
              endpoint: '/auth/login',
            },
            register: {
              endpoint: '/auth/register',
            },
            logout: {
              endpoint: '/auth/logout',
            },
            requestPass: {
              endpoint: '/auth/request-pass',
            },
            resetPass: {
              endpoint: '/auth/reset-pass',
            },
          }),
        ],
        forms: {},
      }),
    
  ]
})
export class SharedModule { }

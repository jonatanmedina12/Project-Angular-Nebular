import { Component } from '@angular/core';
import { NbLayoutModule, NbMenuItem, NbSidebarModule } from '@nebular/theme';
import { SidebarComponent } from "../../common/sidebar/sidebar.component";
import { HeaderComponent } from "../../common/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [NbLayoutModule, SidebarComponent, HeaderComponent,NbSidebarModule,RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  menuItems: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/dashboard/home',
      home: true,
    },
    {
      title: 'Usuarios',
      icon: 'people-outline',
      children: [
        {
          title: 'Lista de Usuarios',
          link: '/dashboard/users',
          icon: 'list-outline'
        },
        {
          title: 'Agregar Usuario',
          link: '/dashboard/users/add',
          icon: 'person-add-outline'
        }
      ]
    },
    {
      title: 'Reportes',
      icon: 'pie-chart-outline',
      link: '/dashboard/reports',
    },
    {
      title: 'Configuración',
      icon: 'settings-outline',
      children: [
        {
          title: 'Perfil',
          link: '/dashboard/profile',
          icon: 'person-outline'
        },
        {
          title: 'Preferencias',
          link: '/dashboard/preferences',
          icon: 'options-outline'
        }
      ]
    }
  ];

}

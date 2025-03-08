import { Component } from '@angular/core';
import { GenericCardComponent } from "../../../shared/components/generic-card/generic-card.component";
import { CommonModule } from '@angular/common';
import { StatisticsCardComponent } from "../../../shared/common/statistics-card/statistics-card.component";
import { RecentActivityComponent } from "../../../shared/common/recent-activity/recent-activity.component";

@Component({
  selector: 'app-dashboard-home',
  imports: [GenericCardComponent, CommonModule, StatisticsCardComponent, RecentActivityComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
   // Datos de ejemplo para las tarjetas de estadísticas
   statistics = [
    {
      title: 'Usuarios',
      value: 1254,
      icon: 'people-outline',
      status: 'primary' as 'primary' | 'success' | 'info' | 'warning' | 'danger',
      trend: 'up' as 'up' | 'down' | 'stable',
      percentage: 12.3
    },
    {
      title: 'Ingresos',
      value: '$45,670',
      icon: 'credit-card-outline',
      status: 'success' as 'primary' | 'success' | 'info' | 'warning' | 'danger',
      trend: 'up' as 'up' | 'down' | 'stable',
      percentage: 8.7
    },
    {
      title: 'Pedidos',
      value: 568,
      icon: 'shopping-cart-outline',
      status: 'info' as 'primary' | 'success' | 'info' | 'warning' | 'danger',
      trend: 'down' as 'up' | 'down' | 'stable',
      percentage: 3.4
    },
    {
      title: 'Visitas',
      value: '12,546',
      icon: 'eye-outline',
      status: 'warning' as 'primary' | 'success' | 'info' | 'warning' | 'danger',
      trend: 'up' as 'up' | 'down' | 'stable',
      percentage: 24.8
    }
  ];

  // Datos de ejemplo para actividades recientes
  recentActivities = [
    {
      user: 'María García',
      action: 'creó una nueva cuenta',
      time: '2 minutos atrás',
      icon: 'person-add-outline',
      color: 'primary'
    },
    {
      user: 'Juan Pérez',
      action: 'realizó un pedido',
      time: '30 minutos atrás',
      icon: 'shopping-bag-outline',
      color: 'success'
    },
    {
      user: 'Ana López',
      action: 'envió un mensaje',
      time: '1 hora atrás',
      icon: 'message-circle-outline',
      color: 'info'
    },
    {
      user: 'Carlos Rodríguez',
      action: 'actualizó su perfil',
      time: '3 horas atrás',
      icon: 'edit-outline',
      color: 'warning'
    },
    {
      user: 'Laura Martínez',
      action: 'canceló su suscripción',
      time: '5 horas atrás',
      icon: 'close-circle-outline',
      color: 'danger'
    }
  ];
constructor() { }

ngOnInit(): void { }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
    // Ruta pública para la autenticación
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth-routing.module').then(m => m.ROUTES_AUTH)
    },
    
    // Ruta protegida para el dashboard
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.ROUTES_DASHBOARD),
    },
    
    // Redirección por defecto
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    
    // Ruta para página no encontrada
    {
      path: '**',
      redirectTo: 'dashboard'
    }
  ];
   
    


import { Component } from '@angular/core';
import { AuthService } from '../../../auth/login/service/auth.service';
import { NbActionsModule, NbContextMenuModule, NbIconModule, NbMenuService, NbUserModule } from '@nebular/theme';
import { Router } from '@angular/router';
import { User } from '../../../auth/login/models/user';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [NbIconModule,NbActionsModule,NbUserModule,NbContextMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser: User | null = null;
  userMenu = [
    { title: 'Perfil', icon: 'person-outline', data: 'profile' },
    { title: 'Configuración', icon: 'settings-outline', data: 'settings' },
    { title: 'Cerrar sesión', icon: 'log-out-outline', data: 'logout' }
  ];

  constructor(
    private authService: AuthService,
    private menuService: NbMenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Suscribirse a los cambios del usuario actual
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Manejar las acciones del menú de usuario
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-menu'),
        map(({ item }) => item.data)
      )
      .subscribe(data => {
        if (data === 'logout') {
          this.logout();
        } else if (data === 'profile') {
          this.router.navigate(['/dashboard/profile']);
        } else if (data === 'settings') {
          this.router.navigate(['/dashboard/preferences']);
        }
      });
  }

  /**
   * Returns the user's name or a default value if not available
   */
  getUserName(): string {
    return this.currentUser?.firstName || 'Usuario';
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        // Incluso si hay un error en el logout, redirigimos al login
        this.router.navigate(['/auth/login']);
      }
    });
  }
}

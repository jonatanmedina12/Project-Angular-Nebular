import { Component, Input } from '@angular/core';
import { NbMenuItem, NbMenuModule, NbUserModule } from '@nebular/theme';
import { User } from '../../../auth/login/models/user';
import { AuthService } from '../../../auth/login/service/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [NbUserModule,NbMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() menuItems: NbMenuItem[] = [];
  currentUser: User | null = null;
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    // Subscribe to user changes
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
  
  /**
   * Returns the user's full name or a default value if not available
   */
  getUserName(): string {
    if (this.currentUser?.firstName && this.currentUser?.lastName) {
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    } else if (this.currentUser?.firstName) {
      return this.currentUser.firstName;
    } else {
      return 'Usuario';
    }
  }
  
  /**
   * Returns the user's role or a default value if not available
   */
  getUserRole(): string {
    return this.currentUser?.role || 'Usuario del sistema';
  }

}

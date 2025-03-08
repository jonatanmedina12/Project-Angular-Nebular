import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { GenericCardComponent } from "../../../../shared/components/generic-card/generic-card.component";
import { GenericAlertComponent } from "../../../../shared/components/generic-alert/generic-alert/generic-alert.component";
import { GenericInputComponent } from "../../../../shared/components/generic-input/generic-input.component";
import { GenericButtonComponent } from "../../../../shared/components/generic-button/generic-button.component";
import { NbCheckboxModule } from '@nebular/theme';

@Component({
  selector: 'app-login',
  imports: [GenericCardComponent, GenericAlertComponent, GenericInputComponent, GenericButtonComponent,NbCheckboxModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  stado :boolean=true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Si el usuario ya está autenticado, redirigir al dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const { email, password, rememberMe } = this.loginForm.value;
    
    this.authService.login(email, password, rememberMe)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
  
  // Métodos para mensajes de error de validación
  get emailErrors(): string {
    const control = this.loginForm.get('email');
    if (control?.hasError('required')) {
      return 'El email es requerido';
    }
    if (control?.hasError('email')) {
      return 'Introduce un email válido';
    }
    return '';
  }
  
  get passwordErrors(): string {
    const control = this.loginForm.get('password');
    if (control?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }
}

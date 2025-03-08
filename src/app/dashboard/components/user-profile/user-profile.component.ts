import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/login/service/auth.service';
import { User } from '../../../auth/login/models/user';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  currentUser: User | null = null;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  isLoading: boolean = false;
  isSaving: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{value: '', disabled: true}],
      phone: [''],
      address: ['']
    });
    
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      }
    });
  }
  
  passwordMatchValidator(g: FormGroup) {
    const newPass = g.get('newPassword')?.value;
    const confirmPass = g.get('confirmPassword')?.value;
    
    return newPass === confirmPass ? null : { mismatch: true };
  }
  
  onSaveProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }
    
    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';
    
    const profileData = {
      ...this.profileForm.value,
      id: this.currentUser?.id
    };
    
    // Aquí iría la llamada al servicio para actualizar el perfil
    setTimeout(() => {
      this.isSaving = false;
      this.successMessage = 'Perfil actualizado correctamente';
    }, 1500);
  }
  
  onChangePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    
    const { currentPassword, newPassword } = this.passwordForm.value;
    
    // Aquí iría la llamada al servicio para cambiar la contraseña
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = 'Contraseña actualizada correctamente';
      this.passwordForm.reset();
    }, 1500);
  }
  
  get confirmPasswordErrors(): string {
    const control = this.passwordForm.get('confirmPassword');
    if (control?.hasError('required')) {
      return 'La confirmación de contraseña es requerida';
    }
    if (this.passwordForm.hasError('mismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}

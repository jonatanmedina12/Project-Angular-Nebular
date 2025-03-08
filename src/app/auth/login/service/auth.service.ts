import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { NbAuthService, NbAuthToken } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private apiUrl = 'http://localhost:3000/api';
  
  constructor(
    private http: HttpClient,
    private nbAuthService: NbAuthService
  ) {
    // Inicializar con el usuario del localStorage si existe
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
    
    // Suscribirse a los cambios de autenticación de NbAuth
    this.nbAuthService.onTokenChange()
      .subscribe((token: NbAuthToken) => {
        if (token.isValid()) {
          this.getUserProfile().subscribe();
        } else {
          this.clearUserData();
        }
      });
  }
  
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
  
  login(email: string, password: string, rememberMe: boolean = false): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('auth_token', response.token);
            if (rememberMe) {
              localStorage.setItem('remember_me', 'true');
            }
            
            // Obtener el perfil del usuario después de iniciar sesión
            this.getUserProfile().subscribe();
          }
        }),
        map(() => this.currentUserValue as User),
        catchError(error => {
          console.error('Error en login:', error);
          return throwError(() => error);
        })
      );
  }
  
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {})
      .pipe(
        tap(() => {
          this.clearUserData();
        }),
        catchError(error => {
          // Incluso si hay error en el logout del backend, limpiamos datos locales
          this.clearUserData();
          return throwError(() => error);
        })
      );
  }
  
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user)
      .pipe(
        catchError(error => {
          console.error('Error en registro:', error);
          return throwError(() => error);
        })
      );
  }
  
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/request-pass`, { email })
      .pipe(
        catchError(error => {
          console.error('Error en solicitud de reseteo:', error);
          return throwError(() => error);
        })
      );
  }
  
  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/reset-pass`, { token, password })
      .pipe(
        catchError(error => {
          console.error('Error en reseteo de contraseña:', error);
          return throwError(() => error);
        })
      );
  }
  
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`)
      .pipe(
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(error => {
          console.error('Error al obtener perfil:', error);
          return throwError(() => error);
        })
      );
  }
  
  private clearUserData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('remember_me');
    this.currentUserSubject.next(null);
  }
}

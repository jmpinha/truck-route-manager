import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() { }

  // For demonstration purposes - these methods would normally
  // communicate with a backend server
  login(email: string, password: string): Observable<boolean> {
    // Simulate successful login
    this.isAuthenticated.next(true);
    return of(true);
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  // Check current authentication status
  checkAuthStatus(): boolean {
    return this.isAuthenticated.value;
  }
}

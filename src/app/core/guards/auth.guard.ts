import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // For now, we'll just return true
  // In a real application, you would check if the user is authenticated
  // and redirect to login if not
  const isAuthenticated = true; // Replace with actual authentication check
  
  if (isAuthenticated) {
    return true;
  } else {
    // Redirect to login page
    router.navigate(['/auth/login']);
    return false;
  }
};


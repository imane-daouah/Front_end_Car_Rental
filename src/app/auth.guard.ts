import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Injection du service Router
  const isAuthenticated = !!localStorage.getItem('token'); // Vérifie si un jeton existe

  if (!isAuthenticated) {
    // Redirige vers la page de connexion si non authentifié
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // Permet l'accès si l'utilisateur est authentifié
  return true;
};

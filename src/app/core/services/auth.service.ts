import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'users';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser()) {
      if (!localStorage.getItem(this.localStorageKey)) {
        localStorage.setItem(
          this.localStorageKey,
          JSON.stringify([
            { email: 'admin@example.com', password: 'admin123' },
          ]),
        );
      }
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]',
    );
    const user = users.find(
      (u: any) => u.email === email && u.password === password,
    );
    return !!user;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  setAuthenticatedUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}

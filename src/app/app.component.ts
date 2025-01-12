import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-manager';
  showNavbar: boolean = true;

  boards = [
    { id: 1, name: 'Proyecto 1', description: 'Gestión del proyecto 1' },
    { id: 2, name: 'Proyecto 2', description: 'Gestión del proyecto 2' },
  ];
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !['/auth/login', '/auth/register'].includes(
          event.urlAfterRedirects,
        );
      }
    });
  }

  addBoard() {
    this.router.navigate(['/boards/new']);
  }

  openBoard(id: number) {
    this.router.navigate(['/boards', id]);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  path: String = '';

  constructor(
        private router: Router,
    ) {
        this.router.events.subscribe(() => {
            this.path = router.url;
        })
    }

    isLogged(): boolean {
        return this.path !== '/signup' && this.path !== '/login';
    }
}

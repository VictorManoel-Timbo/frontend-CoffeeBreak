import { Component } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { featherLogOut } from "@ng-icons/feather-icons";


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NgIcon],
    providers: [LoginService, provideIcons({ featherLogOut })],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    logout(): void {
        this.loginService.logout();
        this.router.navigate(['login']);
    }
}
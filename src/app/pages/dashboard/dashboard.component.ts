import { Component } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { NavBarComponent } from "../../components/navbar/navbar.component";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { featherLogOut, featherShoppingCart, featherUser } from "@ng-icons/feather-icons";
import { LocalStorageUtil } from "../../utils/local-storage.util";
import { UserRole } from "../../models/enums.model";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        RouterOutlet,
        NavBarComponent,
        NgIcon
    ],
    providers: [LoginService, provideIcons({ featherLogOut, featherUser, featherShoppingCart })],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    hasNavBar: boolean = false;
    role: string | null = null;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private activatedRoute: ActivatedRoute
    ) {
        router.events.subscribe(() => {
            const currentRoute = this.getChild(this.activatedRoute);
            this.hasNavBar = currentRoute.snapshot.data['hasNavBar'];
        })
        this.role = this.isAdmin();
        this.redirectBasedOnRole();
    }

    redirectBasedOnRole(): void {
        const currentUrl = this.router.url;

        if (currentUrl !== '/dashboard') return;

        if (this.role === 'ADMIN') {
            this.router.navigate(['dashboard', 'admin', 'users']);
        } else if (this.role === 'CLIENT') {
            this.router.navigate(['dashboard', 'client']);
        } else {
            this.router.navigate(['login']);
        }
    }

    logout(): void {
        this.loginService.logout();
        this.router.navigate(['login']);
    }

    isAdmin(): string | null {
        return new LocalStorageUtil().getItem('role');
    }

    private getChild(route: ActivatedRoute): ActivatedRoute {
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }
}
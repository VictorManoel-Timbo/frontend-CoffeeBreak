import { Component } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { NavBarComponent } from "../../components/navbar/navbar.component";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { featherLogOut, featherShoppingCart, featherUser } from "@ng-icons/feather-icons";

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

    constructor(
        private router: Router,
        private loginService: LoginService,
        private activatedRoute: ActivatedRoute
    ) {
        router.events.subscribe(() => {
            const currentRoute = this.getChild(this.activatedRoute);
            this.hasNavBar = currentRoute.snapshot.data['hasNavBar'];
        })
    }

    logout(): void {
        this.loginService.logout();
        this.router.navigate(['login']);
    }

    private getChild(route: ActivatedRoute): ActivatedRoute {
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }
}
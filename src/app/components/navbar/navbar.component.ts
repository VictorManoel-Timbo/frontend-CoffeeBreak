import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    styleUrl: './navbar.component.css',
    templateUrl: './navbar.component.html'
})
export class NavBarComponent {
    routes: any[] = [
        { name: 'Usuários', path: '../users' },
        { name: 'Pedidos', path: '../orders' },
        { name: 'Categorias', path: '../categories' },
        { name: 'Produtos', path: '../products' },
        { name: 'Estoques', path: '../stocks' },
        { name: 'Ingredientes', path: '../ingredients' },
        { name: 'Pagamentos', path: '../payments' }
    ];
}
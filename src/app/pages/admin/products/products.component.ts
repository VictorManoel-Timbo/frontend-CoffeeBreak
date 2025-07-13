import { Component, OnInit } from "@angular/core";
import { Product } from "../../../models/product.model";
import { ProductService } from "../../../services/product.service";
import { ToastrService } from "ngx-toastr";
import { ProductUtil } from "../../../utils/product.util";
import { TableComponent } from "../../../components/admin/table/table.component";
import { Select } from "primeng/select";
import { FormsModule } from "@angular/forms";
import { take } from "rxjs";

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [TableComponent, FormsModule],
    providers: [ProductService],
    styleUrl: './products.component.css',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
    columns = [
        { field: 'name', header: 'Nome' },
        { field: 'price', header: 'Preço' },
        { field: 'imageUrl', header: 'Imagem' },
        { field: 'calories', header: 'Calorias' },
        { field: 'available', header: 'Disponilidade' },
    ]
    data!: Product[];
    totalSales: { productId: number, name: string, totalSold: number}[] = [];
    hasSales: boolean = false;

    constructor(
        private productService: ProductService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.productService.products.subscribe({
            next: (response) => {
                this.data = response;
            },
            error: () => {
                this.toastr.error('Não foi possível recuperar produtos');
            }
        });
        this.productService.getAll();
    }

    delete(event: Event): void {
        const product: any = event
        this.productService.products.pipe(take(1)).subscribe({
            next: () => {
                this.toastr.success('Usuário deletado com sucesso!');
                this.getAll();
            },
            error: () => {
                this.toastr.error('Não foi possível deletar usuário');
            }
        });
        this.productService.delete(product.id);
    }

    search(event: Event): void {
        const name: any = event;
        this.productService.products.subscribe({
            next: (response) => {
                this.data = response;
            }
        });
        this.productService.getByName(name);
    }

    getSales(): void {
        this.productService.prods.pipe(take(1)).subscribe({
            next: (response) => {
                this.totalSales = response;
                this.hasSales = true;
            },
            error: () => {
                this.toastr.error('Não foi possível recuperar produtos');
            }
        });
        this.productService.getSales();
    }

    getPricesGreater(): void {
        this.productService.products.pipe(take(1)).subscribe({
            next: (response) => {
                this.data = response;
            },
            error: () => {
                this.toastr.error('Não foi possível recuperar produtos');
            }
        });
        this.productService.getPricesGreater();
    }

    getCaloriesGreater(): void {
        this.productService.products.pipe(take(1)).subscribe({
            next: (response) => {
                this.data = response;
            },
            error: () => {
                this.toastr.error('Não foi possível recuperar produtos');
            }
        });
        this.productService.getCaloriesGreater();
    }
}
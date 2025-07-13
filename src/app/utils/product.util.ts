import { Injectable } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model";
import { map, Observable, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductUtil {
    products?: Product[];
    constructor(private service: ProductService) {
    }

    getProductOptions(): Observable<{ label: string; value: number }[]> {
        let prods = this.service.products.pipe(
            take(1),
            map((products: Product[]) =>
                products
                    .map(product => ({
                        label: product.name!,
                        value: product.id!
                    }))
            )
        );
        this.service.getAll();
        return prods;
    }
}
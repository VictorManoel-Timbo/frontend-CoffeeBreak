import { Injectable } from "@angular/core";
import { ProductRestService } from "./rest/product-rest.service";
import { Observable, Subject, take } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(
        private _products: ProductRestService
    ) { }

    private products$: Subject<any> = new Subject<any>();
    private prods$: Subject<any> = new Subject<any>();
    products: Observable<any> = this.products$.asObservable();
    prods: Observable<any> = this.prods$.asObservable();

    getAll(): void {
        this._products.getAll().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.products$.next(response);
                },
                error: (err) => {
                    this.products$.error(err);
                }
            });
    }

    getById(id: number): void {
        this._products.getById(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.products$.next(response);
                },
                error: (err) => {
                    this.products$.error(err);
                }
            });
    }

    getByName(name: string): void {
        this._products.getByName(name).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.products$.next(response);
                },
                error: (err) => {
                    this.products$.error(err);
                }
            });
    }

    getCaloriesGreater(): void {
        this._products.getCaloriesGreater().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.products$.next(response);
                },
                error: (err) => {
                    this.products$.error(err);
                }
            });
    }

    getPricesGreater(): void {
        this._products.getPricesGreater().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.products$.next(response);
                },
                error: (err) => {
                    this.products$.error(err);
                }
            });
    }

    getSales(): void {
        this._products.getSales().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.prods$.next(response);
                },
                error: (err) => {
                    this.prods$.error(err);
                }
            });
    }

    insertAll(prods: Product[]): void {
        this._products.insertAll(prods).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.products$.next(response);
                },
                error: (err) => {
                    this.products$.error(err);
                }
            });
    }

    insert(product: Product): void {
        this._products.insert(product).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.products$.next(response);
                },
                error: (err) => {
                    this.products$.error(err);
                }
            });
    }

    update(product: Product, id: number): void {
        this._products.update(product, id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.products$.next(response);
                },
                error: (err) => {
                    this.products$.error(err);
                }
            });
    }

    delete(id: number): void {
        this._products.delete(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.products$.next(response);
                },
                error: (err) => {
                    this.products$.error(err);
                }
            });
    }
}
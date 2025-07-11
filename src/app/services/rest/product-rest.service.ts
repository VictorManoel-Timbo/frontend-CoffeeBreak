import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../../models/product.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductRestService {
    private baseUrl: string = "http://localhost:8080/api/v1/products"

    constructor(private http: HttpClient) { }

    getAll(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl);
    }

    getById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }

    getByName(name: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/search`, { params: { name } });
    }

    getCaloriesGreater(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/calories-greater`);
    }

    getPricesGreater(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/price-greater`);
    }

    getSales(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/sales`);
    }

    insertAll(products: Product[]): Observable<Product[]> {
        return this.http.post<Product[]>(`${this.baseUrl}/batch`, products);
    }

    insert(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.baseUrl}`, product);
    }

    update(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
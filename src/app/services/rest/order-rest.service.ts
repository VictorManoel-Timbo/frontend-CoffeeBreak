import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../../models/order.model";

@Injectable({ providedIn: 'root' })
export class OrderRestService {
    private baseUrl: string = "http://localhost:8080/api/v1/orders"

    constructor(private http: HttpClient) { }

    getAll(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl);
    }

    getById(id: number): Observable<Order> {
        return this.http.get<Order>(`${this.baseUrl}/${id}`);
    }

    insert(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.baseUrl}`, order);
    }

    update(order: Order, id: number): Observable<Order> {
        return this.http.put<Order>(`${this.baseUrl}/${id}`, order);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
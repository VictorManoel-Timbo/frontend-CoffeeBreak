import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Stock } from "../../models/stock.model";

@Injectable({ providedIn: 'root' })
export class StockRestService {
    private baseUrl: string = "http://localhost:8080/api/v1/stocks"

    constructor(private http: HttpClient) { }

    getAll(): Observable<Stock[]> {
        return this.http.get<Stock[]>(this.baseUrl);
    }

    getStocksOrdered(): Observable<Stock[]> {
        return this.http.get<Stock[]>(`${this.baseUrl}/ordered`);
    }

    getById(id: number): Observable<Stock> {
        return this.http.get<Stock>(`${this.baseUrl}/${id}`);
    }

    insert(stock: Stock): Observable<Stock> {
        return this.http.post<Stock>(`${this.baseUrl}`, stock);
    }

    update(stock: Stock): Observable<Stock> {
        return this.http.put<Stock>(`${this.baseUrl}/${stock.id}`, stock);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
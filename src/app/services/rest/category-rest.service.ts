import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../../models/category.model";

@Injectable({ providedIn: 'root' })
export class CategoryRestService {
    private baseUrl: string = "http://localhost:8080/api/v1/categories"

    constructor(private http: HttpClient) { }

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl);
    }

    getById(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.baseUrl}/${id}`);
    }

    getByName(name: string): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.baseUrl}/search`, { params: { name } });
    }

    insert(category: Category): Observable<Category> {
        return this.http.post<Category>(`${this.baseUrl}`, category);
    }

    update(category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.baseUrl}/${category.id}`, category);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
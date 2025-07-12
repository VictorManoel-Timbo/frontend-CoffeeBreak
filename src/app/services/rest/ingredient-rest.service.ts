import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ingredient } from "../../models/ingredient.model";

@Injectable({ providedIn: 'root' })
export class IngredientRestService {
    private baseUrl: string = "http://localhost:8080/api/v1/ingredients"

    constructor(private http: HttpClient) { }

    getAll(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.baseUrl);
    }

    getMoreUsed(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/more-used`);
    }

    getById(id: number): Observable<Ingredient> {
        return this.http.get<Ingredient>(`${this.baseUrl}/${id}`);
    }

    getByName(name: string): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(`${this.baseUrl}/search`, { params: { name } });
    }

    insert(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.post<Ingredient>(`${this.baseUrl}`, ingredient);
    }

    update(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.put<Ingredient>(`${this.baseUrl}/${ingredient.id}`, ingredient);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
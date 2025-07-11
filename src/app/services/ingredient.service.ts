import { Injectable } from "@angular/core";
import { IngredientRestService } from "./rest/ingredient-rest.service";
import { Observable, Subject, take } from "rxjs";
import { Ingredient } from "../models/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class IngredientService {
    constructor(
        private _ingredients: IngredientRestService
    ) { }

    private ingredients$: Subject<any> = new Subject<any>();

    ingredients: Observable<any> = this.ingredients$.asObservable();

    getAll(): void {
        this._ingredients.getAll().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.ingredients$.next(response);
                },
                error: (err) => {
                    this.ingredients$.error(err);
                }
            });
    }

    getMoreUsed(): void {
        this._ingredients.getMoreUsed().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.ingredients$.next(response);
                },
                error: (err) => {
                    this.ingredients$.error(err);
                }
            });
    }

    getById(id: number): void {
        this._ingredients.getById(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.ingredients$.next(response);
                },
                error: (err) => {
                    this.ingredients$.error(err);
                }
            });
    }

    getByName(name: string): void {
        this._ingredients.getByName(name).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.ingredients$.next(response);
                },
                error: (err) => {
                    this.ingredients$.error(err);
                }
            });
    }

    insert(ingredient: Ingredient): void {
        this._ingredients.insert(ingredient).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.ingredients$.next(response);
                },
                error: (err) => {
                    this.ingredients$.error(err);
                }
            });
    }

    update(ingredient: Ingredient): void {
        this._ingredients.update(ingredient).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.ingredients$.next(response);
                },
                error: (err) => {
                    this.ingredients$.error(err);
                }
            });
    }

    delete(id: number): void {
        this._ingredients.delete(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.ingredients$.next(response);
                },
                error: (err) => {
                    this.ingredients$.error(err);
                }
            });
    }
}
import { Injectable } from "@angular/core";
import { CategoryRestService } from "./rest/category-rest.service";
import { Observable, Subject, take } from "rxjs";
import { Category } from "../models/category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(
        private _categories: CategoryRestService
    ) { }

    private categories$: Subject<any> = new Subject<any>();

    categories: Observable<any> = this.categories$.asObservable();

    getAll(): void {
        this._categories.getAll().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.categories$.next(response);
                },
                error: (err) => {
                    this.categories$.error(err);
                }
            });
    }

    getById(id: number): void {
        this._categories.getById(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.categories$.next(response);
                },
                error: (err) => {
                    this.categories$.error(err);
                }
            });
    }

    getByName(name: string): void {
        this._categories.getByName(name).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.categories$.next(response);
                },
                error: (err) => {
                    this.categories$.error(err);
                }
            });
    }

    insert(category: Category): void {
        this._categories.insert(category).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.categories$.next(response);
                },
                error: (err) => {
                    this.categories$.error(err);
                }
            });
    }

    update(category: Category): void {
        this._categories.update(category).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.categories$.next(response);
                },
                error: (err) => {
                    this.categories$.error(err);
                }
            });
    }

    delete(id: number): void {
        this._categories.delete(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.categories$.next(response);
                },
                error: (err) => {
                    this.categories$.error(err);
                }
            });
    }
}
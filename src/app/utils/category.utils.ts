import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { map, Observable, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoryUtil {
    categories?: Category[];
    constructor(private service: CategoryService) {
    }

    getCategoryOptions(): Observable<{ label: string; value: number }[]> {
        let cats = this.service.categories.pipe(
            take(1),
            map((categories: Category[]) =>
                categories
                    .map(category => ({
                        label: category.name!,
                        value: category.id!
                    }))
            )
        );
        this.service.getAll();
        return cats;
    }

}
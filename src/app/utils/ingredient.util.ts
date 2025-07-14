import { Injectable } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";
import { IngredientService } from "../services/ingredient.service";
import { map, Observable, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class IngredientUtil {
    ingredients?: Ingredient[];
    constructor(private service: IngredientService) {
    }

    getIngredientOptions(): Observable<{ label: string; value: number }[]> {
        let ingreds = this.service.ingredients.pipe(
            take(1),
            map((ingredients: Ingredient[]) =>
                ingredients
                    .map(ingredient => ({
                        label: ingredient.name!,
                        value: ingredient.id!
                    }))
            )
        );
        this.service.getAll();
        return ingreds;
    }

}
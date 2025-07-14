import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/admin/table/table.component';
import { ToastrService } from 'ngx-toastr';
import { IngredientService } from '../../../services/ingredient.service';
import { Ingredient } from '../../../models/ingredient.model';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [TableComponent],
  styleUrl: './ingredients.component.css',
  templateUrl: './ingredients.component.html',
})
export class IngredientsComponent implements OnInit {


  columns = [
    { field: 'name', header: 'Nome' },
    { field: 'type', header: 'Tipo' },
    { field: 'minimumCapacity', header: 'Estoque mínimo' },
    { field: 'unitMeasure', header: 'Unidade medida' },
    { field: 'supplier', header: 'Fornecedor' },
  ];

  data!: Ingredient[];
  hasMoreUsed: boolean = false;
  totalIngredients: { id: number, name: string, productCount: number, }[] = [];

  constructor(
    private ingredientService: IngredientService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.ingredientService.ingredients.subscribe({
      next: (response) => {
        this.data = response;
      },
      error: () => {
        this.toastr.error('Não foi possível recuperar os ingredientes');
      },
    });

    this.ingredientService.getAll();
  }

  delete(event: Event): void {
    const ingredient: any = event;
    this.ingredientService.ingredients.pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success('Ingrediente deletado com sucesso');
        this.getAll();
      },
      error: () => {
        this.toastr.error('Não foi possível deletar o ingrediente');
      }
    });
    this.ingredientService.delete(ingredient.id);
  }

  search(event: Event): void {
    const name: any = event;

    console.log(name);

    this.ingredientService.ingredients.subscribe({
      next: (response) => {
        this.data = response;
      },
      error: () => {
        this.toastr.error('Não foi possível recuperar os ingredientes');
      }
    })
    this.ingredientService.getByName(name);
  }

 getMoreUsed(): void {
  this.ingredientService.getMoreUsed();  

  this.ingredientService.ingredienT.pipe(take(1)).subscribe({
    next: (response) => {
      this.totalIngredients = response;
      this.hasMoreUsed = true;
    },
  });
}



}
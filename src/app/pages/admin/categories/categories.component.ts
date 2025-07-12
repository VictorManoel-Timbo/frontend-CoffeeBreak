import { Component, OnInit } from "@angular/core";
import { TableComponent } from "../../../components/admin/table/table.component";
import { CategoryService } from "../../../services/category.service";
import { ToastrService } from "ngx-toastr";
import { Category } from "../../../models/category.model";
import { take } from "rxjs";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableComponent],
  styleUrl: './categories.component.css',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  columns = [
    { field: 'name', header: 'Nome' },
    { field: 'imageUrl', header: 'Imagem' },
    { field: 'description', header: 'Descrição' },
    { field: 'moment', header: 'Data de Criação'}
  ];

  data: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.categoryService.categories.subscribe({
      next: (response) => this.data = response,
      error: () => this.toastr.error('Não foi possível recuperar categorias')
    });

    this.categoryService.getAll();
  }

  delete(event: Event): void {
    const category = event as Category;

    this.categoryService.categories.pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success('Categoria deletada com sucesso!');
        this.getAll();
      },
      error: () => this.toastr.error('Erro ao deletar categoria')
    });

    this.categoryService.delete(category.id!);
  }

  search(name: string): void {
    this.categoryService.categories.subscribe({
      next: (response) => this.data = response
    });

    this.categoryService.getByName(name);
  }
}
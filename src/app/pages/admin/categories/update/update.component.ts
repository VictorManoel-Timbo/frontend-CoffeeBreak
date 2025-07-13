import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherArrowLeft } from '@ng-icons/feather-icons';

import { InputComponent } from '../../../../components/input/input.component';
import { FormLayoutComponent } from '../../../../components/admin/form-layout/form-layout.component';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';


interface RegisterForm {
    name: FormControl,
    imageUrl: FormControl,
    description: FormControl
}
@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [
    NgIcon,
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    FormLayoutComponent
  ],
  providers: [CategoryService, provideIcons({ featherArrowLeft })],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateCategoryComponent {
  registerForm!: FormGroup<RegisterForm>;
  categoryId: number = -1
  category: Category = {}

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private activeRoute: ActivatedRoute
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      imageUrl: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl<string>('', [Validators.required, Validators.minLength(3)])
    })
  }

  ngOnInit(): void {
      this.categoryId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
      this.getById(this.categoryId);
  }

  getById(id: number): void {
        this.categoryService.categories.subscribe({
            next: (response) => {
                this.category = response;
                this.initForm();
            },
            error: () => {
                this.toastr.error(`Não foi possível encontrar usuário com o id ${id}`);
            }
        });
        this.categoryService.getById(id);
    }

  submit(): void {
    const category: Category = {
      name: this.registerForm.value.name,
      imageUrl: this.registerForm.value.imageUrl,
      description: this.registerForm.value.description,
      moment: new Date().toISOString()
    }
    this.update(category)
  }

  update(category: Category): void {
    this.categoryService.categories.subscribe({
      next: () => {
        this.toastr.success('Cadastro de categoria feito com sucesso')
        this.router.navigate(['dashboard', 'admin', 'categories'])
      },
      error: () => {
        this.toastr.error('Não foi possível cadastrar categoria')
        this.router.navigate(['dashboard', 'admin', 'categories'])
      }
    })
    this.categoryService.update(category, this.categoryId)
  }

  initForm(): void {
          this.registerForm = new FormGroup<RegisterForm>({
            name: new FormControl<string>(this.category.name!, [Validators.required, Validators.minLength(3)]),
            imageUrl: new FormControl<string>(this.category.imageUrl!),
            description: new FormControl<string>(this.category.description!),
          });
  }
}

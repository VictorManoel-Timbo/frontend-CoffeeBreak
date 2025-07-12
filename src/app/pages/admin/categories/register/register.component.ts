import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
    description: FormControl,
}
@Component({
  selector: 'app-register-category',
  standalone: true,
  imports: [
    NgIcon,
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    FormLayoutComponent
  ],
  providers: [CategoryService, provideIcons({ featherArrowLeft })],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterCategoryComponent {
  registerForm!: FormGroup<RegisterForm>;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      imageUrl: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl<string>('', [Validators.required, Validators.minLength(3)])
    })
  }

  submit(): void {
    const category: Category = {
      name: this.registerForm.value.name,
      imageUrl: this.registerForm.value.imageUrl,
      description: this.registerForm.value.description,
      moment: new Date().toISOString()
    }
    this.insert(category)
  }

  insert(category: Category): void {
    this.categoryService.categories.subscribe({
      next: () => {
        this.toastr.success('Cadastro de categoria feito com sucesso')
        this.router.navigate(['dashboard', 'admin','categories'])
      },
      error: () => {
        this.toastr.error('Não foi possível cadastrar categoria')
        this.router.navigate(['dashboard', 'admin', 'categories'])
      }
    })
    this.categoryService.insert(category)
  }
}

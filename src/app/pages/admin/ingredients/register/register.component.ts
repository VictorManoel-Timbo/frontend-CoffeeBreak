import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherArrowLeft } from '@ng-icons/feather-icons';

import { InputComponent } from '../../../../components/input/input.component';
import { FormLayoutComponent } from '../../../../components/admin/form-layout/form-layout.component';
import { IngredientService } from '../../../../services/ingredient.service';
import { IngredientType } from '../../../../models/enums.model';
import { Ingredient } from '../../../../models/ingredient.model';

interface RegisterForm {
  name: FormControl;
  type: FormControl;
  supplier: FormControl;
  minimumCapacity: FormControl;
  unitMeasure: FormControl;
}

@Component({
  selector: 'app-register-ingredient',
  standalone: true,
  imports: [
    NgIcon,
    ReactiveFormsModule,
    RouterLink,
    FormLayoutComponent
  ],
  providers: [IngredientService, provideIcons({ featherArrowLeft })],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup<RegisterForm>;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private ingredientService: IngredientService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      type: new FormControl<IngredientType | null>(null, [Validators.required]),
      supplier: new FormControl('', [Validators.required, Validators.minLength(3)]),
      minimumCapacity: new FormControl(0, [Validators.required, Validators.min(0)]),
      unitMeasure: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  submit(): void {
    const ingredient: Ingredient = {
      name: this.registerForm.value.name,
      type: this.registerForm.value.type,
      supplier: this.registerForm.value.supplier,
      minimumCapacity: this.registerForm.value.minimumCapacity,
      unitMeasure: this.registerForm.value.unitMeasure
      
    };console.log(ingredient);
    this.insert(ingredient);
  
  }
  
  insert(ingredient: Ingredient): void {
    this.ingredientService.ingredients.subscribe({
      next: () => {
        this.toastr.success('Ingrediente cadastrado com sucesso');
        this.router.navigate(['dashboard', 'admin', 'ingredients']);
      },
      error: () => {
        this.toastr.error('Não foi possível cadastrar ingrediente');
        this.router.navigate(['dashboard', 'admin', 'ingredients']);
      }
    });
    this.ingredientService.insert(ingredient);
  }
}

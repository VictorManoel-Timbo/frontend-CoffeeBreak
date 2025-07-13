import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherArrowLeft } from '@ng-icons/feather-icons';

import { FormLayoutComponent } from '../../../../components/admin/form-layout/form-layout.component';
import { IngredientService } from '../../../../services/ingredient.service';
import { Ingredient } from '../../../../models/ingredient.model';
import { IngredientType } from '../../../../models/enums.model';

interface RegisterForm {
  name: FormControl;
  type: FormControl;
  supplier: FormControl;
  minStock: FormControl;
  unitMeasure: FormControl;
}

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    NgIcon,
    ReactiveFormsModule,
    RouterLink,
    FormLayoutComponent
  ],
  providers: [IngredientService, provideIcons({ featherArrowLeft })],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  registerForm!: FormGroup<RegisterForm>;
  ingredientsId: number = -1;
  ingredient: Ingredient = {};

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private ingredientService: IngredientService,
    private activeRoute: ActivatedRoute
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      type: new FormControl(null, [Validators.required]),
      supplier: new FormControl('', [Validators.required, Validators.minLength(3)]),
      minStock: new FormControl(0, [Validators.required, Validators.min(0)]),
      unitMeasure: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
    this.ingredientsId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
    this.getById(this.ingredientsId);
  }

  getById(id: number): void {
    this.ingredientService.ingredients.subscribe({
      next: (response) => {
        this.ingredient = response;
        this.initForm();
      },
      error: () => {
        this.toastr.error(`Não foi possível encontrar ingrediente com o id ${id}`);
      }
    });
    this.ingredientService.getById(id);
  }

  submit(): void {
    const ingredient: Ingredient = {
      
      name: this.registerForm.value.name,
      type: this.registerForm.value.type,
      supplier: this.registerForm.value.supplier,
      minimumCapacity: this.registerForm.value.minStock,
      unitMeasure: this.registerForm.value.unitMeasure,
    };
    this.update(ingredient);
  }

  update(ingredient: Ingredient): void {
    this.ingredientService.ingredients.subscribe({
      next: () => {
        this.toastr.success('Ingrediente atualizado com sucesso');
        this.router.navigate(['dashboard', 'admin', 'ingredients']);
      },
      error: () => {
        this.toastr.error('Não foi possível atualizar ingrediente');
        this.router.navigate(['dashboard', 'admin', 'ingredients']);
      }
    });
    this.ingredientService.update(ingredient, this.ingredientsId);
  }

  initForm(): void {
    this.registerForm = new FormGroup<RegisterForm>({
      name: new FormControl(this.ingredient.name, [Validators.required, Validators.minLength(3)]),
      type: new FormControl(this.ingredient.type, [Validators.required]),
      supplier: new FormControl(this.ingredient.supplier, [Validators.required, Validators.minLength(3)]),
      minStock: new FormControl(this.ingredient.minimumCapacity, [Validators.required, Validators.min(0)]),
      unitMeasure: new FormControl(this.ingredient.unitMeasure, [Validators.required, Validators.minLength(1)]),
    });
  }
}

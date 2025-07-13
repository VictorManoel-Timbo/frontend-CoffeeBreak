import { Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
    FormsModule,
    AbstractControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../../../../services/product.service';
import { StockUtil } from '../../../../utils/stock.util';
import { IngredientUtil } from '../../../../utils/ingredient.util';
import { CategoryUtil } from '../../../../utils/category.utils';
import { ProductAvailable } from '../../../../models/enums.model';
import { FormLayoutComponent } from '../../../../components/admin/form-layout/form-layout.component';
import { InputComponent } from '../../../../components/input/input.component';
import { SelectComponent } from '../../../../components/select/select.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherArrowLeft } from '@ng-icons/feather-icons';

@Component({
    selector: 'app-register-product',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FormLayoutComponent,
        InputComponent,
        SelectComponent,
        MultiSelectModule,
        Select,
        NgIcon,
        RouterLink
    ],
    providers: [ProductService, provideIcons({ featherArrowLeft })]
})
export class RegisterProductComponent implements OnInit {
    form: FormGroup;
    optionsStock: { label: string; value: number }[] = [];
    optionsIngredients: { label: string; value: number }[] = [];
    optionsCategory: { label: string; value: number }[] = [];

    constructor(
        private fb: FormBuilder,
        private stockUtil: StockUtil,
        private ingredientUtil: IngredientUtil,
        private categoryUtil: CategoryUtil,
        private productService: ProductService,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.form = this.fb.group({
            products: this.fb.array([])
        });
    }

    ngOnInit(): void {
        this.loadOptions();
        this.addProduct(); // cria o primeiro produto
    }

    get products(): FormArray {
        return this.form.get('products') as FormArray;
    }

    createProductForm(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            price: [0, Validators.required],
            available: [ProductAvailable.AVAILABLE, Validators.required],
            imageUrl: [''],
            calories: [0],
            categoryId: [null, Validators.required],
            composition: this.fb.array([this.createCompositionForm()])
        });
    }

    createCompositionForm(): FormGroup {
        return this.fb.group({
            stockId: [null, Validators.required],
            ingredientId: [null, Validators.required],
            quantityRequired: [0, Validators.required],
            replaceable: [false],
            useType: [''],
            reusable: [false]
        });
    }

    addProduct(): void {
        this.products.push(this.createProductForm());
    }

    removeProduct(index: number): void {
        this.products.removeAt(index);
    }

    addComposition(productIndex: number): void {
        const composition = this.getComposition(productIndex);
        composition.push(this.createCompositionForm());
    }

    removeComposition(productIndex: number, compIndex: number): void {
        this.getComposition(productIndex).removeAt(compIndex);
    }

    getComposition(productIndex: number): FormArray {
        return this.products.at(productIndex).get('composition') as FormArray;
    }

    loadOptions(): void {
        this.stockUtil.getStockOptions().subscribe((opt) => this.optionsStock = opt);
        this.ingredientUtil.getIngredientOptions().subscribe((opt) => this.optionsIngredients = opt);
        this.categoryUtil.getCategoryOptions().subscribe((opt) => this.optionsCategory = opt);
    }

    submit(): void {
        if (this.form.invalid) return;
        const payload = this.form.value.products;
        this.productService.products.subscribe({
            next: () => {
                this.toastr.success('Produtos cadastrados com sucesso!');
                this.router.navigate(['dashboard', 'admin', 'products']);
            },
            error: () => {
                this.toastr.error('Erro ao cadastrar produtos.');
                this.router.navigate(['dashboard', 'admin', 'products']);
            }
        });
        this.productService.insertAll(payload)
    }

    asFormGroup(control: AbstractControl): FormGroup {
        return control as FormGroup;
    }

    asCompositionGroup(control: AbstractControl): FormGroup {
        return control as FormGroup;
    }


}

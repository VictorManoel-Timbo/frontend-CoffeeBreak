// update.component.ts
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormLayoutComponent } from "../../../../components/admin/form-layout/form-layout.component";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { InputComponent } from "../../../../components/input/input.component";
import { SelectComponent } from "../../../../components/select/select.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "../../../../services/product.service";
import { featherArrowLeft } from "@ng-icons/feather-icons";
import { CommonModule } from "@angular/common";
import { MultiSelectModule } from "primeng/multiselect";
import { StockUtil } from "../../../../utils/stock.util";
import { IngredientUtil } from "../../../../utils/ingredient.util";
import { CategoryUtil } from "../../../../utils/category.utils";
import { ProductAvailable } from "../../../../models/enums.model";
import { Product } from "../../../../models/product.model";
import { take } from "rxjs";
import { Select } from "primeng/select";

@Component({
    selector: 'app-update-product',
    standalone: true,
    imports: [
        FormLayoutComponent,
        NgIcon,
        ReactiveFormsModule,
        InputComponent,
        SelectComponent,
        RouterLink,
        CommonModule,
        FormsModule,
        MultiSelectModule,
        Select
    ],
    providers: [ProductService, provideIcons({ featherArrowLeft })],
    styleUrl: './update.component.css',
    templateUrl: './update.component.html'
})
export class UpdateProductComponent implements OnInit {
    productForm!: FormGroup;
    productId!: number;
    optionsStock: { label: string; value: number }[] = [];
    optionsIngredients: { label: string; value: number }[] = [];
    optionsCategory: { label: string; value: number }[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private productService: ProductService,
        private stockUtil: StockUtil,
        private ingredientUtil: IngredientUtil,
        private categoryUtil: CategoryUtil,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.loadOptions();
        this.productId = parseInt(this.route.snapshot.paramMap.get('id')!);
        this.getById(this.productId);
    }

    getById(id: number): void {
        this.productService.products.subscribe({
            next: (response) => {
                this.initForm(response);
            },
            error: () => this.toastr.error(`Erro ao buscar produto com id ${id}`)
        });
        this.productService.getById(id)
    }

    initForm(product: Product): void {
        console.log(product);
        
        this.productForm = this.fb.group({
            name: [product.name, Validators.required],
            price: [product.price, Validators.required],
            available: [product.available, Validators.required],
            imageUrl: product.imageUrl,
            calories: product.calories,
            categoryId: product.category!.id,
            composition: this.fb.array(product.composition!.map(comp => this.fb.group({
                stockId: [comp.stockId, Validators.required],
                ingredientId: [comp.ingredientId, Validators.required],
                quantityRequired: [comp.quantityRequired, Validators.required],
                replaceable: [comp.replaceable, Validators.required],
                useType: [comp.useType],
                reusable: [comp.reusable, Validators.required],
            })))
        });
    }

    get compositionArray(): FormArray {
        return this.productForm.get('composition') as FormArray;
    }

    get compositionControls(): FormGroup[] {
        return this.compositionArray.controls as FormGroup[];
    }


    addComposition(): void {
        const compArray = this.productForm.get('composition') as FormArray;
        compArray.push(this.fb.group({
            stockId: [null, Validators.required],
            ingredientId: [null, Validators.required],
            quantityRequired: [0, Validators.required],
            replaceable: [false, Validators.required],
            useType: [''],
            reusable: [false, Validators.required],
        }));
    }

    removeComposition(index: number): void {
        const compArray = this.productForm.get('composition') as FormArray;
        if (compArray.length > 1) compArray.removeAt(index);
    }

    loadOptions(): void {
        this.stockUtil.getStockOptions().subscribe(opts => this.optionsStock = opts);
        this.ingredientUtil.getIngredientOptions().subscribe(opts => this.optionsIngredients = opts);
        this.categoryUtil.getCategoryOptions().subscribe(opts => this.optionsCategory = opts);
    }

    submit(): void {
        const product: Product = this.productForm.value;
        console.log(product);
        
        this.productService.products.pipe(take(1)).subscribe({
            next: () => {
                this.toastr.success('Produto atualizado com sucesso!');
                this.router.navigate(['dashboard', 'admin', 'products']);
            },
            error: () => this.toastr.error('Erro ao atualizar produto.')
        });
        this.productService.update(product, this.productId);
    }
}
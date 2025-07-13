import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { FormLayoutComponent } from '../../../../components/admin/form-layout/form-layout.component';
import { InputComponent } from '../../../../components/input/input.component';
import { SelectComponent } from '../../../../components/select/select.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StockService } from '../../../../services/stock.service';
import { featherArrowLeft } from '@ng-icons/feather-icons';
import { ToastrService } from 'ngx-toastr';
import { StockType } from '../../../../models/enums.model';
import { Stock } from '../../../../models/stock.model';

interface RegisterForm {
  type: FormControl;
  capacity: FormControl;
  temperature: FormControl;
  description: FormControl;
}
@Component({
  selector: 'app-update-stock',
  imports: [
    FormLayoutComponent,
    NgIcon,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    RouterLink,
  ],
  providers: [StockService, provideIcons({ featherArrowLeft })],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  registerForm!: FormGroup<RegisterForm>;
  stockId: number = -1;
  stock: Stock = {};

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private stockService: StockService,
    private activeRoute: ActivatedRoute
  ) {
    this.registerForm = new FormGroup({
      type: new FormControl<StockType>(StockType.DRY),
      capacity: new FormControl<string>('', [Validators.required]),
      temperature: new FormControl<string>(''),
      description: new FormControl<string>(''),
    });
  }

  ngOnInit(): void {
    this.stockId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
    this.getById(this.stockId);
  }

  getById(id: number): void {
    this.stockService.stocks.subscribe({
      next: (response) => {
        this.stock = response;
        this.initForm();
      },
      error: () => {
        this.toastr.error(`Não foi possível encontrar estoque com o id ${id}`);
      },
    });
    this.stockService.getById(id);
  }

  submit(): void {
    const stock: Stock = {
      id: this.stockId,
      type: this.registerForm.value.type,
      capacity: this.registerForm.value.capacity,
      temperature: this.registerForm.value.temperature,
      description: this.registerForm.value.description,
    };
    this.update(stock);
  }

  update(stock: Stock): void {
    this.stockService.stocks.subscribe({
      next: () => {
        this.toastr.success('Cadastro de estoque feito com sucesso');
        this.router.navigate(['dashboard', 'admin', 'stocks']);
      },
      error: () => {
        this.toastr.error('Não foi possível cadastrar estoque');
        this.router.navigate(['dashboard', 'admin', 'stocks']);
      },
    });
    this.stockService.update(stock);
  }

  initForm(): void {
    this.registerForm = new FormGroup<RegisterForm>({
      type: new FormControl<StockType>(this.stock.type!, [Validators.required]),
      capacity: new FormControl<number>(this.stock.capacity!),
      temperature: new FormControl<number>(this.stock.temperature!),
      description: new FormControl<string>(this.stock.description!),
    });
  }
}

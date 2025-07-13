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
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { featherArrowLeft } from '@ng-icons/feather-icons';
import { ToastrService } from 'ngx-toastr';
import { Stock } from '../../../../models/stock.model';
import { StockType } from '../../../../models/enums.model';
import { SelectComponent } from '../../../../components/select/select.component';
import { StockService } from '../../../../services/stock.service';

interface RegisterForm {
  type: FormControl;
  capacity: FormControl;
  temperature: FormControl;
  description: FormControl;
}
@Component({
  selector: 'app-register-stock',
  standalone: true,
  imports: [
    NgIcon,
    ReactiveFormsModule,
    FormLayoutComponent,
    InputComponent,
    SelectComponent,
    RouterLink,
  ],
  providers: [CategoryService, provideIcons({ featherArrowLeft })],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup<RegisterForm>;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private stockService: StockService
  ) {
    this.registerForm = new FormGroup({
      type: new FormControl<StockType>(StockType.DRY),
      capacity: new FormControl<number>(0, [Validators.required]),
      temperature: new FormControl<number>(0),
      description: new FormControl<string>(''),
    });
  }

  submit(): void {
    const stock: Stock = {
      type: this.registerForm.value.type,
      capacity: this.registerForm.value.capacity,
      temperature: this.registerForm.value.temperature,
      description: this.registerForm.value.description,
    };
    this.insert(stock);
  }

  insert(stock: Stock): void {
    this.stockService.stocks.subscribe({
      next: () => {
        this.toastr.success('Cadastro de estoque feito com sucesso');
        this.router.navigate(['dashboard', 'admin', 'stocks']);
      },
      error: () => {
        this.toastr.error('Não foi possível cadastrar categoria');
        this.router.navigate(['dashboard', 'admin', 'stocks']);
      },
    });
    this.stockService.insert(stock);
  }
}

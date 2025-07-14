import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ReactiveFormsModule, FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OrderService } from '../../../../services/order.service';

import { OrderStatus, WithdrawalMethod, PaymentMethod } from '../../../../models/enums.model';
import { FormLayoutComponent } from '../../../../components/admin/form-layout/form-layout.component';
import { InputComponent } from '../../../../components/input/input.component';
import { SelectComponent } from '../../../../components/select/select.component';
import { Select } from 'primeng/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherArrowLeft } from '@ng-icons/feather-icons';
import { UserUtil } from '../../../../utils/user.util';
import { ProductUtil } from '../../../../utils/product.util';

@Component({
  selector: 'app-register-order',
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
    Select,
    NgIcon,
    RouterLink
  ],
  providers: [OrderService, provideIcons({ featherArrowLeft })]
})
export class RegisterOrderComponent implements OnInit {
  form: FormGroup;
  clients: { label: string, value: number }[] = [];
  products: { label: string, value: number }[] = [];

  constructor(
    private fb: FormBuilder,
    private userUtil: UserUtil,
    private productUtil: ProductUtil,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      clientId: [null, Validators.required],
      status: [OrderStatus.WAITING_PAYMENT, Validators.required],
      withdrawalMethod: [WithdrawalMethod.PICKUP, Validators.required],
      items: this.fb.array([this.createItemForm()]),
      payment: this.fb.group({
      method: [PaymentMethod.PIX, Validators.required],
      installments: [1, Validators.required]
    })
    });
  }

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
    this.userUtil.getClientOptions().subscribe(opts => this.clients = opts);
    this.productUtil.getProductOptions().subscribe((opts) => this.products = opts);
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  createItemForm(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, Validators.required],
      discount: [0],
      observation: ['']
    });
  }

  addItem(): void {
    this.items.push(this.createItemForm());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      moment: new Date().toISOString(),
      payment: null
    };

    this.orderService.orders.subscribe({
      next: () => {
        this.toastr.success('Pedido cadastrado com sucesso!');
        this.router.navigate(['dashboard', 'admin', 'orders']);
      },
      error: () => {
        this.toastr.error('Erro ao cadastrar pedido.');
        this.router.navigate(['dashboard', 'admin', 'orders']);
      }
    });

    this.orderService.insert(payload);
  }

  get orders(): FormArray {
  return this.form.get('orders') as FormArray;
}

asFormGroup(control: AbstractControl | null): FormGroup {
  return control as FormGroup;
}
}
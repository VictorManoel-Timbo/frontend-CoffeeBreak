import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { OrderService } from '../../../../services/order.service';
import { ProductUtil } from '../../../../utils/product.util';
import { UserUtil } from '../../../../utils/user.util';

import { OrderStatus, WithdrawalMethod } from '../../../../models/enums.model';

import { FormLayoutComponent } from '../../../../components/admin/form-layout/form-layout.component';
import { InputComponent } from '../../../../components/input/input.component';
import { SelectComponent } from '../../../../components/select/select.component';
import { Select } from 'primeng/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherArrowLeft } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-update-order',
  standalone: true,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
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
export class UpdateOrderComponent implements OnInit {
  form!: FormGroup;
  clients: { label: string, value: number }[] = [];
  products: { label: string, value: number }[] = [];
  orderId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private toastr: ToastrService,
    private productUtil: ProductUtil,
    private userUtil: UserUtil
  ) {}

  ngOnInit(): void {
    this.loadOptions();

    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.orders.subscribe({
      next: (order) => this.initForm(order),
      error: () => this.toastr.error('Não foi possível carregar pedido')
    });
    this.orderService.getById(this.orderId)
  }

  initForm(order: any): void {
    this.form = this.fb.group({
      clientId: [order.clientId, Validators.required],
      status: [order.status, Validators.required],
      withdrawalMethod: [order.withdrawalMethod, Validators.required],
      items: this.fb.array(order.items.map((item: any) => this.fb.group({
        productId: [item.productId, Validators.required],
        quantity: [item.quantity, Validators.required],
        discount: [item.discount ?? 0],
        observation: [item.observation ?? '']
      }))),
      payment: null
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, Validators.required],
      discount: [0],
      observation: ['']
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  loadOptions(): void {
    this.userUtil.getClientOptions().subscribe(opts => this.clients = opts);
    this.productUtil.getProductOptions().subscribe((opts) => this.products = opts);
  }

  submit(): void {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      id: this.orderId,
      moment: new Date().toISOString(),
      payment: null
    };

    this.orderService.orders.subscribe({
      next: () => {
        this.toastr.success('Pedido atualizado com sucesso!');
        this.router.navigate(['dashboard', 'admin', 'orders']);
      },
      error: () => {
        this.toastr.error('Erro ao atualizar pedido.');
        this.router.navigate(['dashboard', 'admin', 'orders']);
      }
    });

    this.orderService.update(payload, this.orderId);
  }

  asFormGroup(control: AbstractControl | null): FormGroup {
    return control as FormGroup;
  }
}

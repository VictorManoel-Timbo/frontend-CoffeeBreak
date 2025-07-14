import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormLayoutComponent } from '../../../../components/admin/form-layout/form-layout.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { InputComponent } from '../../../../components/input/input.component';
import { SelectComponent } from '../../../../components/select/select.component';
import { Router, RouterLink } from '@angular/router';
import { Paymentservice } from '../../../../services/payment.service';
import { featherArrowLeft } from '@ng-icons/feather-icons';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethod } from '../../../../models/enums.model';
import { Payment } from '../../../../models/payment.model';
import { Select } from 'primeng/select';
import { OrderUtil } from '../../../../utils/order.util';


interface RegisterForm {
  orderId: FormControl,
  method: FormControl,
  installments: FormControl
}
@Component({
  selector: 'app-register-payment',
  imports: [
    FormLayoutComponent,
    NgIcon,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    Select,
    RouterLink,
  ],
  providers: [Paymentservice, provideIcons({ featherArrowLeft })],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup<RegisterForm>
  orderOptions: { value: number }[] = [];

  constructor(
      private router: Router,
      private toastr: ToastrService,
      private paymentService: Paymentservice,
      private orderUtil: OrderUtil
  ) {
      this.registerForm = new FormGroup({
        orderId: new FormControl<number | null>(null, [Validators.required]),
        method: new FormControl<PaymentMethod>(PaymentMethod.CREDIT, [Validators.required]),
        installments: new FormControl<number>(1, [Validators.required]),
      });
  }

  ngOnInit(): void {
    this.orderUtil.getOrderOptions().subscribe({
      next: (options) => {this.orderOptions = options},
      error: () => this.toastr.error('Não foi possível carregar pedidos')
    });
  }

  submit(): void {
      const payment: Payment = {
        orderId: this.registerForm.value.orderId!,
        method: this.registerForm.value.method,
        installments: this.registerForm.value.installments,
        moment: new Date().toISOString()
      };
      this.insert(payment);
  }

  insert(payment: Payment): void {
      this.paymentService.payments.subscribe({
        next: () => {
          this.toastr.success('Cadastro de pagamento feito com sucesso');
          this.router.navigate(['dashboard', 'admin', 'payments']);
        },
        error: () => {
          this.toastr.error('Não foi possível cadastrar pagamento');
          this.router.navigate(['dashboard', 'admin', 'payments']);
        },
      });
      this.paymentService.insert(payment);
    }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormLayoutComponent } from '../../../../components/admin/form-layout/form-layout.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { InputComponent } from '../../../../components/input/input.component';
import { SelectComponent } from '../../../../components/select/select.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Paymentservice } from '../../../../services/payment.service';
import { featherArrowLeft } from '@ng-icons/feather-icons';
import { Payment } from '../../../../models/payment.model';
import { PaymentMethod } from '../../../../models/enums.model';
import { OrderUtil } from '../../../../utils/order.util';
import { ToastrService } from 'ngx-toastr';

interface RegisterForm {
    orderId: FormControl;
    method: FormControl;
    installments: FormControl;
}
@Component({
  selector: 'app-update-payment',
  imports: [
    FormLayoutComponent,
    NgIcon,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    RouterLink],
  providers: [Paymentservice, provideIcons({ featherArrowLeft })],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  registerForm!: FormGroup<RegisterForm>;
  orderOptions: { value: number }[] = [];
  paymentId: number = -1;
  payment: Payment = {};

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private paymentService: Paymentservice,
    private activeRoute: ActivatedRoute,
    private orderUtil: OrderUtil,
  ){
    this.registerForm = new FormGroup({
          orderId: new FormControl<number | null>(null, [Validators.required]),
          method: new FormControl<PaymentMethod>(PaymentMethod.CREDIT, [Validators.required]),
          installments: new FormControl<number>(1, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.orderUtil.getOrderOptions().subscribe({
      next: (options) => {this.orderOptions = options},
    });
    this.paymentId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
    this.getById(this.paymentId);
  }

  getById(id: number): void {
    this.paymentService.payments.subscribe({
      next: (response) => {
        this.payment = response;
        this.initForm();
      },
      error: () => {
        this.toastr.error(`Não foi possível encontrar pagamento com o id ${id}`);
      },
    });
    this.paymentService.getById(id);
  }

  submit(): void {
      const payment: Payment = {
        orderId: this.registerForm.value.orderId!,
        method: this.registerForm.value.method,
        installments: this.registerForm.value.installments,
        moment: new Date().toISOString()
      };
      this.update(payment, this.paymentId);
  }

  update(payment: Payment, paymentId: number): void {
      this.paymentService.payments.subscribe({
        next: () => {
          this.toastr.success('Atualização de pagamento feito com sucesso');
          this.router.navigate(['dashboard', 'admin', 'payments']);
        },
        error: () => {
          this.toastr.error('Não foi possível atualizar estoque');
          this.router.navigate(['dashboard', 'admin', 'payments']);
        },
      });
      this.paymentService.update(payment, paymentId);
    }

  initForm(): void {
      this.registerForm = new FormGroup<RegisterForm>({
        orderId: new FormControl<number>(this.payment.orderId!, [Validators.required]),
        method: new FormControl<PaymentMethod>(this.payment.method!, [Validators.required]),
        installments: new FormControl<number>(this.payment.installments!, [Validators.required]),
      });
    }
}

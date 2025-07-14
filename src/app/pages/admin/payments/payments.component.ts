import { Component } from '@angular/core';
import { TableComponent } from '../../../components/admin/table/table.component';
import { Payment } from '../../../models/payment.model';
import { ToastrService } from 'ngx-toastr';
import { Paymentservice } from '../../../services/payment.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
  columns = [
    { field: 'orderId', header: 'Id Pagamento'},
    { field: 'method', header: 'Método de Pagamento' },
    { field: 'installments', header: 'Parcelas'},
    { field: 'moment', header: 'Data de Criação'},
  ];

  data: Payment[] = []

  constructor(
      private paymentService: Paymentservice,
      private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.paymentService.payments.subscribe({
      next: (response) => this.data = response,
      error: () => this.toastr.error('Não foi possível recuperar categorias')
    });

    this.paymentService.getAll();
  }

  delete(event: Event): void {
      const payment = event as Payment;
  
      this.paymentService.payments.pipe(take(1)).subscribe({
        next: () => {
          this.toastr.success('Pagamento deletada com sucesso!');
          this.getAll();
        },
        error: () => this.toastr.error('Erro ao deletar pagamento')
      });
  
      this.paymentService.delete(payment.id!);
  }
}

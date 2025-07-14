import { Component } from '@angular/core';
import { TableComponent } from '../../../components/admin/table/table.component';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { OrderStatus, WithdrawalMethod } from '../../../models/enums.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  columns = [
    { field: 'total', header: 'Total (R$)' },
    { field: 'status', header: 'Status' },
    { field: 'withdrawalMethod', header: 'Forma de Entrega' },
    { field: 'moment', header: 'Data do Pedido' },
  ];

  data: any[] = [];

  constructor(
    private orderService: OrderService, 
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.orderService.orders.subscribe({
      next: (response) => {
        this.data = response
      },
      error: () => this.toastr.error('Não foi possível recuperar pedidos'),
    });

    this.orderService.getAll();
  }

  delete(event: Event): void {
    const order = event as Order;

    this.orderService.orders.pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success('Pedido deletado com sucesso!');
        this.getAll();
      },
      error: () => this.toastr.error('Erro ao deletar pedido'),
    });

    this.orderService.delete(order.id!);
  }

  mapStatus(status: OrderStatus): string {
    return {
      WAITING_PAYMENT: 'Aguardando Pagamento',
      PAID: 'Pago',
      PREPARING: 'Preparando',
      DELIVERED: 'Entregue',
      CANCELED: 'Cancelado',
    }[status];
  }

  mapWithdrawal(method: WithdrawalMethod): string {
    return {
      DELIVERY: 'Entrega',
      PICKUP: 'Retirada',
    }[method];
  }
}

import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderUtil {
  constructor(private service: OrderService) {}

  getOrderOptions(): Observable<{ value: number }[]> {
    let orders = this.service.orders.pipe(
      take(1),
      map((orders: Order[]) =>
        orders.map(order => ({
          value: order.id!
        }))
      )
    );
    this.service.getAll()
    return orders
  }
}
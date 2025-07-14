import { Injectable } from "@angular/core";
import { OrderRestService } from "./rest/order-rest.service";
import { Observable, Subject, take } from "rxjs";
import { Order } from "../models/order.model";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(
        private _orders: OrderRestService
    ) { }

    private orders$: Subject<any> = new Subject<any>();

    orders: Observable<any> = this.orders$.asObservable();

    getAll(): void {
        this._orders.getAll().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.orders$.next(response);
                },
                error: (err) => {
                    this.orders$.error(err);
                }
            });
    }

    getById(id: number): void {
        this._orders.getById(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.orders$.next(response);
                },
                error: (err) => {
                    this.orders$.error(err);
                }
            });
    }

    insert(order: Order): void {
        this._orders.insert(order).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.orders$.next(response);
                },
                error: (err) => {
                    this.orders$.error(err);
                }
            });
    }

    update(order: Order, id: number): void {
        this._orders.update(order, id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.orders$.next(response);
                },
                error: (err) => {
                    this.orders$.error(err);
                }
            });
    }

    delete(id: number): void {
        this._orders.delete(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.orders$.next(response);
                },
                error: (err) => {
                    this.orders$.error(err);
                }
            });
    }
}
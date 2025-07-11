import { Injectable } from "@angular/core";
import { PaymentRestService } from "./rest/payment-rest.service";
import { Observable, Subject, take } from "rxjs";
import { Payment } from "../models/payment.model";

@Injectable({
    providedIn: 'root'
})
export class Paymentservice {
    constructor(
        private _payments: PaymentRestService
    ) { }

    private payments$: Subject<any> = new Subject<any>();

    payments: Observable<any> = this.payments$.asObservable();

    getAll(): void {
        this._payments.getAll().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.payments$.next(response);
                },
                error: (err) => {
                    this.payments$.error(err);
                }
            });
    }

    getById(id: number): void {
        this._payments.getById(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.payments$.next(response);
                },
                error: (err) => {
                    this.payments$.error(err);
                }
            });
    }

    insert(payment: Payment): void {
        this._payments.insert(payment).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.payments$.next(response);
                },
                error: (err) => {
                    this.payments$.error(err);
                }
            });
    }

    update(payment: Payment): void {
        this._payments.update(payment).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.payments$.next(response);
                },
                error: (err) => {
                    this.payments$.error(err);
                }
            });
    }

    delete(id: number): void {
        this._payments.delete(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.payments$.next(response);
                },
                error: (err) => {
                    this.payments$.error(err);
                }
            });
    }
}
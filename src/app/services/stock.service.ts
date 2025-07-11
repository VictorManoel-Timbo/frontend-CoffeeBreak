import { Injectable } from "@angular/core";
import { StockRestService } from "./rest/stock-rest.service";
import { Observable, Subject, take } from "rxjs";
import { Stock } from "../models/stock.model";

@Injectable({
    providedIn: 'root'
})
export class StockService {
    constructor(
        private _stocks: StockRestService
    ) { }

    private stocks$: Subject<any> = new Subject<any>();

    stocks: Observable<any> = this.stocks$.asObservable();

    getAll(): void {
        this._stocks.getAll().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.stocks$.next(response);
                },
                error: (err) => {
                    this.stocks$.error(err);
                }
            });
    }

    getStocksOrdered(): void {
        this._stocks.getStocksOrdered().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.stocks$.next(response);
                },
                error: (err) => {
                    this.stocks$.error(err);
                }
            });
    }

    getById(id: number): void {
        this._stocks.getById(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.stocks$.next(response);
                },
                error: (err) => {
                    this.stocks$.error(err);
                }
            });
    }

    insert(stock: Stock): void {
        this._stocks.insert(stock).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.stocks$.next(response);
                },
                error: (err) => {
                    this.stocks$.error(err);
                }
            });
    }

    update(stock: Stock): void {
        this._stocks.update(stock).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.stocks$.next(response);
                },
                error: (err) => {
                    this.stocks$.error(err);
                }
            });
    }

    delete(id: number): void {
        this._stocks.delete(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.stocks$.next(response);
                },
                error: (err) => {
                    this.stocks$.error(err);
                }
            });
    }
}
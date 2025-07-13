import { Injectable } from "@angular/core";
import { StockService } from "../services/stock.service";
import { Stock } from "../models/stock.model";
import { map, Observable, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StockUtil {
    stocks?: Stock[];
    constructor(private service: StockService) {
    }

    getStockOptions(): Observable<{ label: string; value: number }[]> {
        let stocks = this.service.stocks.pipe(
            take(1),
            map((stocks: Stock[]) =>
                stocks
                    .map(stock => ({
                        label: stock.type!,
                        value: stock.id!
                    }))
            )
        );
        this.service.getAll();
        return stocks;
    }

}
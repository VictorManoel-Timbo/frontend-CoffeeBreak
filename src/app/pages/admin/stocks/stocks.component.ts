import { Component } from '@angular/core';
import { TableComponent } from '../../../components/admin/table/table.component';
import { Stock } from '../../../models/stock.model';
import { StockService } from '../../../services/stock.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../../../components/select/select.component';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [TableComponent, FormsModule, SelectComponent],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css',
})
export class StocksComponent {
  columns = [
    { field: 'type', header: 'Tipo' },
    { field: 'description', header: 'Descrição' },
    { field: 'temperature', header: 'Temperatura' },
    { field: 'capacity', header: 'Capacidade' },
  ];
  data!: Stock[];

  sortDirection: 'asc' | 'desc' | null = null;

  constructor(
    private stockService: StockService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.stockService.stocks.subscribe({
      next: (response) => (this.data = response),
      error: () => this.toastr.error('Não foi possível recuperar estoques'),
    });

    this.stockService.getAll();
  }

  getStocksOrdered(): void {
    if (!this.sortDirection) {
      this.toastr.warning('Selecione uma direção de ordenação!');
      return;
    }

    this.stockService.stocks.pipe((take(1))).subscribe({
      next: (response) => (this.data = response),
      error: () => this.toastr.error('Erro ao ordenar os estoques'),
    })

    this.stockService.getStocksOrdered(this.sortDirection)
  }

  delete(event: Event): void {
    const stock = event as Stock;

    this.stockService.stocks.pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success('Estoque deletado com sucesso!');
        this.getAll();
      },
      error: () => this.toastr.error('Erro ao deletar estoque'),
    });

    this.stockService.delete(stock.id!);
  }
}

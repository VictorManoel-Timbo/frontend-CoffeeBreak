import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @Input() title!: string;
  @Input() createRoute!: string;
  @Input() updateRoute!: string;
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] = [];

  @Output() delete = new EventEmitter<any>();

  filteredData: any[] = [];
  search: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredData = this.data;
  }

  onSearch(): void {
    const term = this.search.toLowerCase();
    if (term.length >= 3) {
      this.filteredData = this.data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(term)
        )
      );
    } else {
      this.filteredData = this.data;
    }
  }

  onEdit(id: any): void {
    this.router.navigate([`${this.updateRoute}/${id}`]);
  }

  onCreate(): void {
    this.router.navigate([this.createRoute]);
  }

  onDelete(item: any): void {
    const confirmed = window.confirm('Deseja realmente apagar este item?');
    if (confirmed) {
      this.delete.emit(item);
    }
  }
}

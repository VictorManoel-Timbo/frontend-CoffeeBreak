import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputComponent } from "../../input/input.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, InputComponent, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @Input() title!: string;
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] = [];
  @Input() hasSearch: boolean = true;

  @Output() delete = new EventEmitter<any>();
  @Output("search") searchText = new EventEmitter<any>();

  filteredData: any[] = [];
  search = new FormControl<string>('', [Validators.required, Validators.minLength(3)]);
  url: string = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.url = this.activeRoute.snapshot.url.join('/');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.filteredData = changes['data'].currentValue; 
    }
  }

  ngOnInit(): void {
    this.filteredData = this.data;
  }

  onSearch(): void {
    this.searchText.emit(this.search.value);
  }

  onEdit(id: number): void {
    this.router.navigate(['dashboard','admin', this.url, 'update', id]);
  }

  onCreate(): void {
    this.router.navigate(['dashboard','admin', this.url, 'register']);
  }

  onDelete(item: any): void {
    const confirmed = window.confirm('Deseja realmente apagar este item?');
    if (confirmed) {
      this.delete.emit(item);
    }
  }
}

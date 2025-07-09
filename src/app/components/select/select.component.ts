import { Component, Input, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { ReactiveFormsModule } from '@angular/forms';
import * as Enums from '../../models/enums.model'; // Importa todos os enums de uma vez

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [SelectModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit {
  @Input() type!: keyof typeof Enums; // Ex: 'UserRole', 'OrderStatus', etc
  @Input() controlName!: string;
  @Input() placeholder: string = 'Selecione';

  options: { label: string, value: string }[] = [];

  ngOnInit(): void {
    const selectedEnum = Enums[this.type];

    if (!selectedEnum) {
      console.warn(`Enum "${this.type}" não encontrado.`);
      return;
    }

    this.options = this.mapEnumToOptions(selectedEnum);
  }

  private mapEnumToOptions(enumObj: any): { label: string, value: string }[] {
    return Object.entries(enumObj).map(([key, value]) => ({
      label: this.formatLabel(key),
      value: value as string
    }));
  }

  private formatLabel(text: string): string {
    return text
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());
  }
}

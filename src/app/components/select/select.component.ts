import { Component, Input, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import * as Enums from '../../models/enums.model';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [SelectModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true
    }
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() type!: keyof typeof Enums;
  @Input() inputName: string = '';
  @Input() placeholder: string = 'Selecione';
  @Input() label: string = '';
  options: { label: string, value: string }[] = [];

  
  value: any;
  onChange: any = () => { };
  onTouched: any = () => { };

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

  onInput(event: any): void {
    this.value = event.value;
    this.onChange(event.value);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

}

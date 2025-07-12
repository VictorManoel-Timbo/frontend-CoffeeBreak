import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [NgClass],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.css'
})
export class FormLayoutComponent { 
  @Input() title: string = '';
  @Input() buttonText: string = '';
  @Input() disabledButton: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();

  submit(): void {
    this.onSubmit.emit();
  }
}

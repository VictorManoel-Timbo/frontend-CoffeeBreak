import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    InputComponent
  ] ,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent { }

import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';

@Component({
  selector: 'app-login',
  imports: [
    LoginLayoutComponent
  ] ,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent { }

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    InputComponent,
    NgClass
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
    });
  }

  submit(): void {
    const request: any = { email: this.loginForm.value.email, password: this.loginForm.value.password }
    this.loginService.log.subscribe({
      next: () => {
        this.toastr.success('Login feito com sucesso')
        this.router.navigate(['dashboard'])
      },
      error: () => { this.toastr.error('Erro inesperado, tente novamente mais tarde') }
    });
    this.loginService.login(request.email, request.password)
  }

  navigate(): void {
    this.router.navigate(['signup']);
  }
}

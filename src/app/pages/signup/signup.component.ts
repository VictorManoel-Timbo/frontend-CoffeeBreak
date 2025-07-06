import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { User } from '../../models/user.model';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  phone: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    InputComponent,
    NgClass
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      phone: new FormControl<string>('', [Validators.pattern(/^\(?\d{2}\)?[\s-]?9\d{4}-?\d{4}$/)]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
    });
  }

  submit(): void {
    const user: User = {
      name: this.signupForm.value.name, 
      email: this.signupForm.value.email, 
      phone: this.signupForm.value.phone,
      password: this.signupForm.value.password
    }
    this.loginService.register(user)
      .subscribe({
        next: () => { 
          this.toastr.success('Cadastro feito com sucesso')
          this.router.navigate(['dashboard']) 
        },
        error: () => { this.toastr.error('Erro inesperado, tente novamente mais tarde') }
      });
  }

  navigate(): void {
    this.router.navigate(['login']);
  }
}

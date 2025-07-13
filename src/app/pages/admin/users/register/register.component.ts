import { Component } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { featherArrowLeft } from "@ng-icons/feather-icons";
import { FormLayoutComponent } from "../../../../components/admin/form-layout/form-layout.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputComponent } from "../../../../components/input/input.component";
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "../../../../models/user.model";
import { UserRole } from "../../../../models/enums.model";
import { SelectComponent } from "../../../../components/select/select.component";
import { UserService } from "../../../../services/user.service";
import { take } from "rxjs/operators";

interface RegisterForm {
    name: FormControl,
    email: FormControl,
    phone: FormControl,
    country: FormControl,
    password: FormControl,
    role: FormControl
}

@Component({
    selector: 'app-register-user',
    standalone: true,
    imports: [
        FormLayoutComponent,
        NgIcon,
        ReactiveFormsModule,
        InputComponent,
        SelectComponent,
        RouterLink
    ],
    providers: [UserService, provideIcons({ featherArrowLeft })],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm!: FormGroup<RegisterForm>;

    constructor(
        private router: Router,
        private userService: UserService,
        private toastr: ToastrService
    ) {
        this.registerForm = new FormGroup({
            name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl<string>('', [Validators.required, Validators.email]),
            phone: new FormControl<string>('', [Validators.pattern(/^\(?\d{2}\)?[\s-]?9\d{4}-?\d{4}$/)]),
            country: new FormControl<string>('',[Validators.minLength(3)]),
            password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
            role: new FormControl<UserRole>(UserRole.CLIENT)
        });
    }

    submit(): void {
        const user: User = {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            phone: this.registerForm.value.phone,
            password: this.registerForm.value.password,
            country: this.registerForm.value.country,
            role: this.registerForm.value.role
        }
        this.insert(user);
    }

    insert(user: User): void {
        this.userService.users.subscribe({
            next: () => {
                this.toastr.success('Cadastro de usuário feito com sucesso');
                this.router.navigate(['dashboard', 'admin']);
            },
            error: () => {
                this.toastr.error('Não foi possível cadastrar usuário');
                this.router.navigate(['dashboard', 'admin']);
            }
        });
        this.userService.insert(user);
    }
}
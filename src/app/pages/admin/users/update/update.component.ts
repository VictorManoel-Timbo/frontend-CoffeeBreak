import { Component, OnInit } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { featherArrowLeft } from "@ng-icons/feather-icons";
import { FormLayoutComponent } from "../../../../components/admin/form-layout/form-layout.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputComponent } from "../../../../components/input/input.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
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
    selector: 'app-update-user',
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
    templateUrl: './update.component.html',
    styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
    registerForm!: FormGroup<RegisterForm>;
    userId: number = -1;
    user: User = {};

    constructor(
        private router: Router,
        private userService: UserService,
        private toastr: ToastrService,
        private activeRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.userId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
        this.getById(this.userId);
    }

    getById(id: number): void {
        this.userService.users.subscribe({
            next: (response) => {
                this.user = response;
                this.initForm();
            },
            error: () => {
                this.toastr.error(`Não foi possível encontrar usuário com o id ${id}`);
            }
        });
        this.userService.getById(id);
    }

    submit(): void {
        this.user = {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            phone: this.registerForm.value.phone,
            password: this.registerForm.value.password,
            country: this.registerForm.value.country,
            role: this.registerForm.value.role
        }
        this.update(this.user);
    }

    update(user: User): void {
        this.userService.updateUser.pipe(take(1)).subscribe({
            next: () => {
                this.toastr.success('Atualização de usuário feito com sucesso');
                this.router.navigate(['dashboard', 'admin']);
            },
            error: () => {
                this.toastr.error('Não foi possível atualizar usuário');
                this.router.navigate(['dashboard', 'admin']);
            }
        })
        this.userService.update(user, this.userId);
    }

    initForm(): void {
        this.registerForm = new FormGroup<RegisterForm>({
            name: new FormControl<string>(this.user.name!, [Validators.required, Validators.minLength(3)]),
            email: new FormControl<string>(this.user.email!, [Validators.required, Validators.email]),
            phone: new FormControl<string>(this.user.phone!, [Validators.pattern(/^\(?\d{2}\)?[\s-]?9\d{4}-?\d{4}$/)]),
            country: new FormControl<string>(this.user.country!, [Validators.minLength(3)]),
            password: new FormControl<string>(this.user.password!, [Validators.required, Validators.minLength(8)]),
            role: new FormControl<UserRole>(this.user.role!)
        });
    }
}
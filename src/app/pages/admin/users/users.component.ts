import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { ToastrService } from "ngx-toastr";
import { User } from "../../../models/user.model";
import { TableComponent } from "../../../components/admin/table/table.component";
import { take } from "rxjs";
import { FormsModule } from "@angular/forms";
import { Select } from "primeng/select";
import { UserUtil } from "../../../utils/user.util";

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [TableComponent, FormsModule, Select],
    providers: [],
    styleUrl: './users.component.css',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    columns = [
        { field: 'name', header: 'Nome' },
        { field: 'email', header: 'Email' },
        { field: 'phone', header: 'Telefone' },
        { field: 'country', header: 'Nacionalidade' },
        { field: 'role', header: 'Função' },
    ]
    data!: User[];
    options: { label: string, value: number, }[] = [];
    selectedClient!: number;
    hasOrderCount: boolean = false;
    totalOrders: { userId: number, name: string, totalOrders: number, }[] = [];

    constructor(
        private userService: UserService,
        private toastr: ToastrService,
        private utils: UserUtil
    ) { }

    ngOnInit(): void {
        this.utils.getClientOptions().subscribe({
            next: (options) => {
                this.options = options;
            }
        });
        this.getAll();
    }


    getAll(): void {
        this.userService.users.subscribe({
            next: (response) => {
                this.data = response;
            },
            error: () => {
                this.toastr.error('Não foi possível recuperar usuários');
            }
        });
        this.userService.getAll();
    }

    delete(event: Event): void {
        const user: any = event
        this.userService.users.pipe(take(1)).subscribe({
            next: () => {
                this.toastr.success('Usuário deletado com sucesso!');
                this.getAll();
            },
            error: () => {
                this.toastr.error('Não foi possível deletar usuário');
            }
        });
        this.userService.delete(user.id);
    }

    search(event: Event): void {
        const name: any = event;

        console.log(name);
        this.userService.users.subscribe({
            next: (response) => {
                this.data = response;
            }
        });
        this.userService.getByName(name);
    }

    getOrdersGreater(id: number): void {
        this.userService.users.pipe(take(1)).subscribe({
            next: (response) => {
                this.data = response;
            },
            error: () => {
                this.toastr.error('Não foi possível recuperar usuários');
            }
        })
        this.userService.getOrdersGreater(id);
    }

    getOrderCount(): void {
        this.userService.updateUser.subscribe({
            next: (response) => {
                this.totalOrders = response;
                this.hasOrderCount = true;
            }
        });
        this.userService.getOrderCount();
    }
}
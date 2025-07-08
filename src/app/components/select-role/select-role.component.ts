import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { UserRole } from '../../models/enums.model';

@Component({
  selector: 'app-select-role',
  imports: [SelectModule, ReactiveFormsModule],
  templateUrl: './select-role.component.html',
  styleUrl: './select-role.component.css'
})
export class SelectRoleComponent {
  roles = [
  { label: 'Comum', value: UserRole.CLIENT },
  { label: 'Administrador', value: UserRole.ADMIN }
];
}

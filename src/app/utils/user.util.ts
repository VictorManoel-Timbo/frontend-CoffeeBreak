import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { UserRole } from "../models/enums.model";
import { map, Observable, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserUtil {
    users?: User[];
    constructor(private service: UserService) {
    }

    getClientOptions(): Observable<{ label: string; value: number }[]> {
        let clients = this.service.users.pipe(
            take(1),
            map((users: User[]) =>
                users
                    .filter(user => user.role === UserRole.CLIENT)
                    .map(user => ({
                        label: user.name!,
                        value: user.id!
                    }))
            )
        );
        this.service.getAll()
        return clients
    }

}
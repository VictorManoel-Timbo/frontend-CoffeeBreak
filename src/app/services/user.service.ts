import { Injectable } from "@angular/core";
import { UserRestService } from "./rest/user-rest.service";
import { Observable, Subject, take } from "rxjs";
import { User } from "../models/user.model";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private _users: UserRestService
    ) { }

    private users$: Subject<any> = new Subject<any>();

    users: Observable<any> = this.users$.asObservable();

    getAll(): void {
        this._users.getAll().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.users$.next(response);
                },
                error: (err) => {
                    this.users$.error(err);
                }
            });
    }

    getOrderCount(): void {
        this._users.getOrderCount().pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.users$.next(response);
                },
                error: (err) => {
                    this.users$.error(err);
                }
            });
    }

    getOrdersGreater(id: number): void {
        this._users.getOrdersGreater(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.users$.next(response);
                },
                error: (err) => {
                    this.users$.error(err);
                }
            });
    }

    getByEmail(email: string): void {
        this._users.getByEmail(email).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.users$.next(response);
                },
                error: (err) => {
                    this.users$.error(err);
                }
            });
    }

    getByName(name: string): void {
        this._users.getByName(name).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.users$.next(response);
                },
                error: (err) => {
                    this.users$.error(err);
                }
            });
    }

    getById(id: number): void {
        this._users.getById(id).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.users$.next(response);
                },
                error: (err) => {
                    this.users$.error(err);
                }
            });
    }

    insert(user: User): void {
        this._users.insert(user).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.users$.next(response);
                },
                error: (err) => {
                    this.users$.error(err);
                }
            });
    }

    update(user: User): void {
        this._users.update(user).pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.users$.next(response);
                },
                error: (err) => {
                    this.users$.error(err);
                }
            });
    }

    delete(id: number): void {
        this._users.delete(id).pipe(take(1))
            .subscribe({
                next: (reponse) => {
                    this.users$.next(reponse);
                },
                error: (err) => {
                    this.users$.error(err);
                }
            })
    }
}
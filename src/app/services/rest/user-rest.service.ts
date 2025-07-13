import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";

@Injectable({ providedIn: 'root' })
export class UserRestService {
  private baseUrl: string = "http://localhost:8080/api/v1/users";

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getOrderCount(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/order-count`);
  }

  getOrdersGreater(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/clients-greater/${id}`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user`, { params: { email } });
  }

  getByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/search`, { params: { name } });
  }

  insert(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  update(user: User, id: number): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginResponse } from "../../models/login-response.model";
import { User } from "../../models/user.model";

@Injectable({ providedIn: 'root' })
export class LoginRestService {
  private baseUrl: string = "http://localhost:8080/api/v1/auth";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password });
  }

  register(data: User): Observable<LoginResponse> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
  
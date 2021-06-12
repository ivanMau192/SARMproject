import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl;
  constructor(private http:HttpClient) {

    this.baseUrl = environment.baseUrl
  }

  loginUser(user,password): Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'login',{user:user,password:password});
	}
}

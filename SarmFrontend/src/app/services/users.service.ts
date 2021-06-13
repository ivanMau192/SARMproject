import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string;

  constructor(private http:HttpClient) {

    this.baseUrl = environment.baseUrl
  }

  getAllUsers(): Observable <any[]>
	{
		return this.http.get<any[]>(this.baseUrl+'getAllUsers');
	}

  getAllProfiles(): Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'profileslist',{});
	}
  getAllPermissions(): Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'permissionsList',{});
	}

  modifyUsers(users):Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'addUser',{data:users});
	}
  modifyProfiles(profiles):Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'profiles/modify',{data:profiles});
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl: string;

  constructor(private http:HttpClient) {

    this.baseUrl = environment.baseUrl
  }


  getAllServices(): Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'getAllServices',{});
	}


}

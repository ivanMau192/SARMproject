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

  saveServices(data): Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'addService',{data:data});
	}

  getAllContracts():Observable <any[]>
	{
    return this.http.post<any[]>(this.baseUrl+'getAllContracts',{});
  }

  uploadServiceData(service,data):Observable <any[]>{
    return this.http.post<any[]>(this.baseUrl+'services/addDataServices',{service:service,data:data});
  }

  getServicesData(id):Observable <any[]>{
    return this.http.post<any[]>(this.baseUrl+'getServicesData',{servId:id});
  }

  getServicesFiltered(fecha,contId):Observable <any[]>{
    return this.http.post<any[]>(this.baseUrl+'getServicesFiltered',{fecha:fecha,contId:contId});
  }

  getAllModules():Observable <any[]>{
    return this.http.post<any[]>(this.baseUrl+'getAllModules',{});
  }

}

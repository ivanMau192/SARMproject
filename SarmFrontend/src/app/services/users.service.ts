import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, Observable } from "rxjs";


/**
 * Servicio de usuarios
 * Este servicio se encarga de realizar las peticiones necesarias al backend
 */


@Injectable({
  providedIn: 'root'
})
export class UsersService {
	/**
     * Variable usada para la obtencion de punto de acceso desde variables de entorno
     * @type string
     */
   baseUrl: string;

  /**
  * Constructor
  *
  * @param {HttpClient} http cliente http para realizar llamadas
  */

  constructor(private http:HttpClient) {
	
	
    this.baseUrl = environment.baseUrl
  }

  /**
  * Este metodo se utiliza para obtener los usuarios desde backend
  * @example
  * getAllUsers()
  * @returns  {Promise} Objeto Json con lista de usuarios
  */
  
  getAllUsers(): Observable <any[]>
	{
		return this.http.get<any[]>(this.baseUrl+'getAllUsers');
	}

	/**
	 * Este metodo se utiliza para obtener los perfiles desde backend
	 * @example
	 * getAllProfiles()
	 * @returns  {Promise} Objeto Json con lista de perfiles
	 */
  getAllProfiles(): Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'profileslist',{});
	}

	/**
  * Este metodo se utiliza para obtener los permisos desde backend
  * 
  * @example
  * getAllPermissions()
  * @returns  {Promise} Objeto Json con lista de permisos
  */

  getAllPermissions(): Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'permissionsList',{});
	}

	/**
  * Este metodo se utiliza para agregar y/o modificar usuarios
  * @param {object} users
  * Objeto de tipo users que se envia para agregar y/o modificar usuarios
  * @example
  * modifyUsers(users)
  * @returns  {Promise} Objeto Json con estado de peticion
  */
  modifyUsers(users):Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'addUser',{data:users});
	}

	/**
  * Este metodo se utiliza para agregar y/o modificar perfiles
  * @param {object} profiles
  * Objeto de tipo users que se envia para agregar y/o modificar usuarios
  * @example
  * modifyProfiles(profiles)
  * @returns  {Promise} Objeto Json con estado de peticion
  */
  modifyProfiles(profiles):Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'profiles/modify',{data:profiles});
	}
}

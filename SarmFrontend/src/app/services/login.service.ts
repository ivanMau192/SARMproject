import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, Observable } from "rxjs";



/**
 * Servicio de login
 * Este servicio se encarga de realizar las peticiones necesarias al backend para obtener todo lo relacionado al login
 */


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /**
     * Variable usada para la obtencion de punto de acceso desde variables de entorno
     * @type string
     */
  baseUrl;
  /**
  * Constructor
  *
  * @param {HttpClient} http cliente http para realizar llamadas
  */
  constructor(private http:HttpClient) {

    this.baseUrl = environment.baseUrl
  }

  /**
  * Este metodo se utiliza para realizar login en la plataforma
  * @example
  * loginUser(user,password)
  * @param {String} user
  * Usuario a authenticar
  * @param {String} password
  * Contraseña de usuarios
  * @returns  {Promise} Objeto Json con estado
  */

  loginUser(user,password): Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'login',{user:user,password:password}, { withCredentials: true });
	}

  /**
  * Este metodo se utiliza para realizar logout en la plataforma
  * @example
  * logOut()
  * @returns  {Promise} Objeto Json con estado
  */
  logOut(): Observable <any[]>
	{
		return this.http.get<any[]>(this.baseUrl+'logout',{ withCredentials: true });
	}
}


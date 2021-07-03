import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



/**
 * Servicio de servicios
 * Este servicio se encarga de realizar las peticiones necesarias al backend para obtener todo lo relacionado al modulo de servicios
 */

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
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
  * Este metodo se utiliza para obtener los servicios desde backend
  * @example
  * getAllServices()
  * @returns  {Promise} Objeto Json con lista de servicios
  */

  getAllServices(): Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'getAllServices',{});
	}

  /**
  * Este metodo se utiliza para agregar y/o modificar servicios
  * @example
  * saveServices(data)
  * @param {object} data
  * objeto de tipo servicios necesario para modificar o agregar servicio
  * @returns  {Promise} Objeto con estado de peticion
  */

  saveServices(data): Observable <any[]>
	{
		return this.http.post<any[]>(this.baseUrl+'addService',{data:data});
	}

  /**
  * Este metodo se utiliza para obtener los contratos desde backend
  * @example
  * getAllContracts()
  * @returns  {Promise} Objeto Json con lista de contratos
  */

  getAllContracts():Observable <any[]>
	{
    return this.http.post<any[]>(this.baseUrl+'getAllContracts',{});
  }


  /**
  * Este metodo se utiliza para agregar un servicio y sus detalles
  * @example
  * uploadServiceData(service,data)
  * @param {object} service
  * objeto de tipo servicios necesario para agregar
  * @param {object} data
  * objeto de tipo service_data necesario para agregar y asociar al servicio
  * @returns  {Promise} Objeto con estado de peticion
  */

  uploadServiceData(service,data):Observable <any[]>{
    return this.http.post<any[]>(this.baseUrl+'services/addDataServices',{service:service,data:data});
  }

  /**
  * Este metodo se utiliza para obtener los datos de un servicio especifico
  * @example
  * getServicesData(id)
  * @param {string} id
  * Id de servicio a consultar
  * @returns  {Promise} Objeto con estado de peticion
  */

  getServicesData(id):Observable <any[]>{
    return this.http.post<any[]>(this.baseUrl+'getServicesData',{servId:id});
  }

  /**
  * Este metodo se utiliza para obtener los servicios segun fecha y contrato
  * @example
  * getServicesFiltered(fecha,contId)
  * @param {string} fecha
  * fecha a consultar
  * @param {string} contId
  * contrato a consultar
  * @returns  {Promise} Objeto con estado de peticion
  */

  getServicesFiltered(fecha,contId):Observable <any[]>{
    return this.http.post<any[]>(this.baseUrl+'getServicesFiltered',{fecha:fecha,contId:contId});
  }

  /**
  * Este metodo se utiliza para obtener los modulos desde el backend
  * @example
  * getAllModules()
  * @returns  {Promise} Objeto Json con lista de modulos
  */
  
  getAllModules():Observable <any[]>{
    return this.http.post<any[]>(this.baseUrl+'getAllModules',{});
  }

}

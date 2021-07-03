import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Interceptador de peticion
 * Este interceptador se encarga de validar las cabeceras para que el backend mantenga las sesiones al momento de utilizar servicios
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	/**
     * Variable usada para excluir Urls
     * @type string
     */
	urlsToNotUse: Array<string>;
	/**
	 * Constructor
	 *
	 */
	constructor() {
		this.urlsToNotUse= [];
	}


	/**
	 * Este metodo se utiliza para realizar la intercepccion
	 * @example
	 * intercept(request, next)
	 * @param {Object} request
	 *	Objeto de tipo Request
	 * @param {Object} next
	 * Objeto de tipo Next
	 * @returns  {Next} Cesion de peticion a emisor original
	 */

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.isValidRequestForInterceptor(request.url)) {
			let token = localStorage.getItem('token');
			if (token) {
				let headers = new HttpHeaders().set('token',token);
			}
			request = request.clone({
				"withCredentials": true
			});
		}
		
		return next.handle(request);
	}


	/**
	 * Este metodo se utiliza para validar la peticion
	 * @example
	 * intercept(request, next)
	 * @param {Object} requestUrl
	 * Url a validar
	 * @returns {Bool} 
	 */
	private isValidRequestForInterceptor(requestUrl: string): boolean {
		// let positionIndicator: string = 'api/';
		// let position = requestUrl.indexOf(positionIndicator);
		// if (position > 0) {
		//   let destination: string = requestUrl.substr(position + positionIndicator.length);
		//   for (let address of this.urlsToNotUse) {
		// 	if (new RegExp(address).test(destination)) {
		// 	  return false;
		// 	}
		//   }
		// }

		for (let url of this.urlsToNotUse) {
			if (requestUrl.includes(url)) {
				console.log('url sin interceptar')
				return false;
			}
		}
		return true;
	  }
}



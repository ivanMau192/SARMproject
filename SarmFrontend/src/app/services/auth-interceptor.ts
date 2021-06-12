import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	urlsToNotUse: Array<string>;
	constructor() {
		this.urlsToNotUse= [];
	}

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



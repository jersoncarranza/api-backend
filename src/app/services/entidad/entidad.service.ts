import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from '../global';
@Injectable({
  providedIn: 'root'
})
export class EntidadService {
	public url: string;
  	constructor(public _http: HttpClient) { 
		this.url = GLOBAL.url;
	  }


  getEntidad(token=''): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									.set('Authorization', token);
		return this._http.get(this.url + 'get-entidades',{headers: headers});	
	}
}

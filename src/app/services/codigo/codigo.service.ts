import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from '../global';
import {Codigo} from '../../models/codigo';
@Injectable({
  	providedIn: 'root'
})
export class CodigoService {
	public url: string;

  	constructor(public _http: HttpClient) {
		this.url = GLOBAL.url;
	}
	// Almacena los datos y la captura de la transaccion
	saveCodigo(codigo: Codigo): Observable<any>{
		let params = JSON.stringify(codigo);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');	
        return this._http.post(this.url + 'save-codigo', params,{headers:headers})
        //console.log(codigo_to_register)
	}
	/*
	register(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'register', params,{headers:headers})
	}
	*/
}

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

	getuserCode(token='', page=1): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									.set('Authorization', token);
		return this._http.get(this.url + 'user-code/' + page,{headers: headers});	
	}

	putEditCode(token='', codigo:Codigo):Observable<any>{
		let params = JSON.stringify(codigo);
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization', token);
		return this._http.put(this.url + 'edit-estado-pago', params,{headers: headers});		
	}

}

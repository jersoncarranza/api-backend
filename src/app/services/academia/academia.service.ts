
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from '../global';
import {Escuela} from '../../models/escuela';
import {Profesor} from '../../models/profesor';
import{Materia} from '../../models/materia';
import{ProfesorMateria} from '../../models/profesorMateria';
import{EstrellasEvaluacion} from '../../models/estrellasEvaluacion';


@Injectable({
  providedIn: 'root'
})
export class AcademiaService {

  public url: string;
	public token;
  	constructor(public _http: HttpClient) {
		this.url = GLOBAL.urlPublic + 'admin/';
	}

	getToken(){
		let token = localStorage.getItem('token');
			if(token != "undefined"){
				this.token = token;
			}else{
				this.token;
			}
			return this.token;
		  }


	saveEscuela(escuela: Escuela): Observable<any>{
		this.getToken();
		let params = JSON.stringify(escuela);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
									.set('Authorization', this.token);	;	
        return this._http.post(this.url + 'save-escuela', params,{headers:headers})
	}

	getEscuela(): Observable<any>{
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type','application/json')
									.set('Authorization', this.token);
		return this._http.get(this.url + 'list-escuela',{headers: headers});	
	}

	saveProfesor(profesor: Profesor): Observable<any>{
		this.getToken();
		let params = JSON.stringify(profesor);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
									   .set('Authorization', this.token);		
        return this._http.post(this.url + 'save-profesor', params,{headers:headers})
	}
	
	getProfesor(): Observable<any>{
		console.log('pass');
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization', this.token);
		return this._http.get(this.url + 'list-profesor' ,{headers: headers});	
	}



	saveMateria(materia: Materia): Observable<any>{
		this.getToken();
		console.log('materia'+materia);
		let params = JSON.stringify(materia);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
									   .set('Authorization', this.token);		
        return this._http.post(this.url + 'save-materia', params,{headers:headers})
	}
	
	getMateria(): Observable<any>{
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization', this.token);
		return this._http.get(this.url + 'list-materia',{headers: headers});	
	}


	saveprofesorMateria(profMateria: ProfesorMateria): Observable<any>{
		this.getToken();
		let params = JSON.stringify(profMateria);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
									   .set('Authorization', this.token);		
        return this._http.post(this.url + 'save-profesormateria', params,{headers:headers})
	}

	getMateriasProfesor(profesor:String): Observable<any>{
		this.getToken();
		console.log('profesor'+profesor);
		let headers = new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization', this.token);
		return this._http.get(this.url + 'list-profesormateria/'+profesor,{headers: headers});	
	}

	/***Evaluar los Profesores*** */

	getEvaluarProfesor(): Observable<any>{
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization', this.token);
		return this._http.get(this.url + 'list-evaluacionProfesor',{headers: headers});	
	}
	/*******Save Calificacion ****/
	saveEstrellasEvaluacion(EstrellasEvaluacion: EstrellasEvaluacion): Observable<any>{
		this.getToken();
		let params = JSON.stringify(EstrellasEvaluacion);
		console.log(EstrellasEvaluacion);

		let headers = new HttpHeaders().set('Content-Type', 'application/json')
									   .set('Authorization', this.token);		
        return this._http.post(this.url + 'save-estrellasevaluacion', params,{headers:headers})
	}
	/***Obteniendo las estrellas */
	getEstrellasEvaluacionProfesor(): Observable<any>{
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization', this.token);
		return this._http.get(this.url + 'list-estrellasevaluacionprofesores',{headers: headers});	
	}
}

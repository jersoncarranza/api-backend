import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {GLOBAL} from '../global';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

  envioGmail(data):Observable<any>{
    let params = JSON.stringify(data);
    
    // this.mail.from = "jersoncarranza2@gmail.com";
    // this.mail.text =  this.msgSend(this.codigo.code); 
    // this.mail.to = this.codigo.correoPeticion.trim();
    // this.mail.subject 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');	
    return this._http.post(this.url + 'envio-correo', params,{headers:headers})

  }
}

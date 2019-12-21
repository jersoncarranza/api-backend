import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from '../global';
import {Observable} from 'rxjs/Observable';
import {FollowService} from '../../services/follow.service';
import{Match} from '../../models/match';
@Injectable({
  	providedIn: 'root'
})
export class MatchService {
  	public url: string;
  	public identity;
	  public token;

  	constructor(
    	public _http: HttpClient,
    	public _followService: FollowService
  	) {
    	this.url = GLOBAL.url;
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

  	getMatch(): Observable<any>{
    	let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken()); 
    	return this._http.get(this.url + 'get-match',{headers:headers});
	  }
	  
	saveMatch(match:Match):Observable<any>{
	let params = JSON.stringify(match);
	let headers = new HttpHeaders().set('Content-Type', 'application/json')
								.set('Authorization', this.getToken());
	return this._http.post(this.url + 'save-match', params,{headers:headers});
	}


}

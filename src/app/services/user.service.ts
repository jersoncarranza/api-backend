import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {User} from '../models/user';
import {FollowService} from '../services/follow.service';
 
@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient,
        public _followService: FollowService
        ){
        this.url = GLOBAL.url;
    }
    register(user: User): Observable<any>{
        let params = JSON.stringify(user); 
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'register', params,{headers:headers})
        //console.log(user_to_register)
    }

    signup(user: User, gettoken = null): Observable<any>{
        if(gettoken != null){
            user.gettoken = gettoken;
            
        }
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url + 'login/', params,{headers: headers}); 
    } 
    
    getIdendity(){
      
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
          
            this.identity = null;
        }
        return this.identity;
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

    getStats(){
        //localStorage.setItem('stats', JSON.stringify(response));
			
        let stats = JSON.parse(localStorage.getItem('stats'));
        /*if (stats != "undefined") {
         */
           // let stats = this.getServiceStats();
           // console.log('listo _ : '+ stats)
        /*
        }else{
            stats = null;
        }
        */
        return stats;
    }
    getServiceStats(){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken()); 
        let user = JSON.parse(localStorage.getItem('identity'));
        let followed = user._id;
        console.log('al servicio'+followed)
        //if(userId != null){
            return this._http.get(this.url + 'get-my-follows/'+ followed,{headers:headers});

        /*}else{
            return this._http.get(this.url + 'counters/'+ {headers:headers});
        }*/


    }

    getCounters(userId = null): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken()); 
        //return this._http.post(this.url + 'register', params,{headers:headers})
        /*
        if(userId == null){
            let user = JSON.parse(localStorage.getItem('identity'));
            userId = user._id;
            console.log('asigono al usuraio loguado '+userId);

        }
        */
       
        if(userId != null){
            return this._http.get(this.url + 'counters/'+ userId,{headers:headers});

        }else{
            return this._http.get(this.url + 'counters/'+ {headers:headers});
        }
    }
    
    updateUser(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization', this.getToken());
        return this._http.put(this.url + 'update-user/'+ user._id, params,{headers:headers})
        
    } 


    getUsers(page = null):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());
        return this._http.get(this.url + 'users/'+ page,{headers:headers});
    }


    getUser(id=0):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());
        return this._http.get(this.url + 'user/'+ id,{headers:headers});
    }
}
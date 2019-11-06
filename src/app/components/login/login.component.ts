import { Component, OnInit } from '@angular/core';
import{Router, ActivatedRoute, Params} from '@angular/router';
import{User} from '../../models/user';
import{UserService} from '../../services/user.service';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  public title:string;
  public user:User;
  public status: string;
  public identity: string;
  public token: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Identificate';
    this.user = new User("","","","","","ROLE_USER","",	"",	"");
   }

  ngOnInit() {
    this.verifyLogin();
  }
	  
	verifyLogin(){
		this.identity = this._userService.getIdendity();
		if(this.identity != null){
			this._router.navigate(['/']);
		}
	}
	  
	onSubmit(){
	  // this._userService.signup(this.user,'true').subscribe(
	  this._userService.signup(this.user,'true').subscribe(
		  response =>{
				this.token = response.token;
				this.user = response.user;
				//console.log(response);
				if(!this.token.length == true){
					this.status='error'; 
				}else{
					//Persistrir datos de usuario
					localStorage.setItem('token', this.token);
					localStorage.setItem('identity', JSON.stringify(this.user)); 
					//Conseguir los contadores o estadisticas del usuario
					this.getCounters();
					this._router.navigate(['/timeline']);
					
				} 
		  },
		  error =>{
			  var errorMessage = <any>error;
			  if(errorMessage != null){
				  this.status = 'error'
			  }
		  }
	  )
  }

   getToken(){
	this._userService.signup(this.user, 'true').subscribe(
			response =>{
				this.token = response.token;
				console.log(this.token);
				if(!this.token.length == true){
					this.status='error';
				}else{
					this.status = 'success';
					//Persistiri datos dek usuario  
				}
			},
			error =>{
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.status = 'error'
				}
			}
		)
	}

	getCounters(){
		this._userService.getCounters().subscribe(
			response =>{
				localStorage.setItem('stats', JSON.stringify(response));
				this.status = 'success';
				this._router.navigate(['/home']);
				console.log(response);
			},
			error=>{
				console.log(<any>error);
			}
		)
	}
}

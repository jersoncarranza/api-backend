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
  public status: Number;
  public identity: string;
  public token: string;
  public message:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Identificate';
    this.user = new User("","","","","","","",	"",	"","",""); 
   }

  ngOnInit() {
    //this.verifyLogin();
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
			this.status=response.status;
			if (this.status==1) {
				
				this.token = response.token;
				this.user = response.user;
				this.status=response.status;

				if(!this.token.length == true){
					this.mensaje(this.status);
				}else{
					//Persistir datos de usuario
					localStorage.setItem('token', this.token);
					localStorage.setItem('identity', JSON.stringify(this.user)); 
					//Conseguir los contadores o estadisticas del usuario
					this.getCounters();
					this.mensaje(this.status);
					this._router.navigate(['/timeline']);
					
				} 
			}else{
		
				this.mensaje(this.status);
			}
				
			
		  },
		  error =>{
			  var errorMessage = <any>error;
			  if(errorMessage != null){
				this.mensaje(this.status);
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
					this.status=2;
				}else{
					this.status = 1;
					//Persistiri datos dek usuario  
				}
			},
			error =>{
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.status = 2;
				}
			}
		)
	}
	getCounters(){
		this._userService.getCounters().subscribe(
			response =>{
				localStorage.setItem('stats', JSON.stringify(response));
				this.status = 1;
				this._router.navigate(['/home']);
				console.log(response);
			},
			error=>{
				this.status =2;
				console.log(<any>error);
			}
		)
	}
	mensaje(code:Number){
		switch (code) {
			case 0: this.message = 'Usuario Desactivado'; break;
			case 1: this.message = 'Logueado Correctamente '; break;

		case 2:   this.message = 'Usuario o clave incorrecta'; break;
			default:  this.message='No hay respuesta del servidor';	break;
		}
	}

}

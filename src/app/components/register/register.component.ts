import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from '../../models/user';
import {Entidad} from '../../models/entidad';

import {UserService} from '../../services/user.service';
import {EntidadService} from '../../services/entidad/entidad.service';


import {MustMatch} from '../../services/validator/must-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService,EntidadService]
})
export class RegisterComponent implements OnInit {
	
	banderaCodigo: Boolean;//Universidades registradas 
	 

	submitted = false;
	public identity;
	public title:string; 
	public user: User;
	public entidad:Entidad[];
	public status: number;

	public message:string;
	registerForm: FormGroup;
	codigo:string;//Codigo que le llegara al email para que se registre solo a los Hombre

  	constructor(
		private formBuilder: FormBuilder,
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _entidadService:EntidadService
	  ) { 
		this.title = 'Registrate';
		this.user = new User("","","","","","ROLE_USER","","","","","");
		this.banderaCodigo  =true;
  	}

  	ngOnInit() {
		//this.verifyLogin();

		this.validate();
		this.obtenerEntidad();
	  }
	  
	get f() { return this.registerForm.controls; }

  	validate() {
		this.registerForm = this.formBuilder.group({
            name:  ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', Validators.required],
			rdoGenero:['',Validators.required],
			codigo:   ['',Validators.required],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
  	}

  	verifyLogin(){
		this.identity = this._userService.getIdendity();
		if(this.identity != null){
			this._router.navigate(['/']);
		}
  	}
	valuechangeEmail(text:String){
		var split = text.split("@");
		var dominio   = split[1];
		this.banderaCodigo=true;
		this.entidad.forEach((user) => { 
			if (dominio.trim() == user.dominio.trim()) {
				this.banderaCodigo=false;
			}
		}); 

		if (this.banderaCodigo) {
			document.getElementById("divCodigo").style.visibility = "visible";	
			document.getElementById("linkCodigo").style.visibility = "visible";
		}else{
			document.getElementById("divCodigo").style.visibility = "hidden";	
			document.getElementById("linkCodigo").style.visibility = "hidden";
		}
	}	
	obtenerEntidad(){
	//	this.entidad = this._entidadService.getEntidad();
	this._entidadService.getEntidad().subscribe(
		response => {
			if(response){
				this.entidad=response.result;
			  }else{
				  this.status = response.status;	 
			  }
		  },
		  error => {
			  var errorMessage  = <any>error;
			  if(errorMessage != null){
				console.log('response'+ errorMessage);

			  }
		  }
	  )
	}

	  public role: string;
  	onSubmit(){
		this.submitted = true;
		switch (this.registerForm.value.name) {
		case 'X': console.log('no elegiste genero'); break;
		case 'M':this.registerForm.value.codigo='KENNY';break; 
		case 'H':; break;
		default: break;
		}
	

	if(this.registerForm.valid || 
			(this.registerForm.value.name    != ''   && 
			this.registerForm.value.email	 != ''   && 
			this.registerForm.value.password != null &&
			this.registerForm.value.confirmPassword !=null &&
			this.registerForm.value.password == this.registerForm.value.confirmPassword) &&
			this.registerForm.value.rdoGenero == 'M'){
			this.user.name   =   this.registerForm.value.name.trim();
			this.user.email  =   this.registerForm.value.email.trim();
			this.user.password = this.registerForm.value.password;
			this.user.codigo   = this.registerForm.value.codigo.trim();
			this.user.genero   = this.registerForm.value.rdoGenero;
			this.user.role	   = this.role;
			this._userService.register(this.user).subscribe(
		   	response => {
				this.status =response.status;
				this.mensaje(this.status);
		 		}
		 	);
		}else{
			console.log('Mal');
		}
	}

	
	private genero: string="X";
    setGenero(genero: string): void   
	  {  //M Mujer ; H Hombre

		if (this.banderaCodigo==true) {
			switch (genero) {
				case 'M': 
				/***Codigo anterior dond elas mujeres se pueden registar* */
						//this.registerForm.value.codigo='KENNY';
						//this.role='ROLE_USER';
						//document.getElementById("divCodigo").style.visibility = "hidden";	
						//document.getElementById("linkCodigo").style.visibility = "hidden";break;
				/***********Codigo  nuevo************ */
					this.role='ROLE_PREMIUM';
					this.registerForm.value.codigo=null;
					document.getElementById("divCodigo").style.visibility = "visible"; 
					document.getElementById("linkCodigo").style.visibility = "visible";break;
				case 'H':
					//document.getElementById("codigo").value = "";
					this.role='ROLE_PREMIUM';
					this.registerForm.value.codigo=null;
					document.getElementById("divCodigo").style.visibility = "visible"; 
					document.getElementById("linkCodigo").style.visibility = "visible";break;
					default: break;
				}
			}else{
				this.role='ROLE_USER';
			}
		this.genero = genero;     
	}  	
  
	mensaje(code){
		switch (code) {
			case 1: this.message = 'Registrado correctamente. Inicia Sesión con '+this.user.email; this.registerForm.reset(); break;
			case 2: this.message = 'Error en el servidor #2'; break;
			case 4: this.message = 'Este correo ya existe'; break;
			case 5: this.message = 'Error en el servidor#5'; break;
			case 7: this.message = 'Este codigo no existe'; break;
			case 8: this.message = 'Enviame la informacion necesaria'; break;
			case 9: this.message = 'Error al guardar !#9'; break;
			default:  this.message='No hay respuesta del servidor';	break;
		}
	}
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import{Materia} from '../../../../models/materia';
import{Escuela} from '../../../../models/escuela';
import {AcademiaService} from '../../../../services/academia/academia.service';
import * as alertify from 'alertifyjs'; 

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css'],
  providers:[AcademiaService]
})
export class MateriaComponent implements OnInit {
	
	submitted = false;
	materiaForm: FormGroup;
	public materiasLista: Materia; 
	public materiaSave: Materia; 
	public status: String; 
	public message: String;
	public escuelasLista: Escuela; 

  	constructor(
		private formBuilder2: FormBuilder,
		private _academiaService: AcademiaService
	  ) {
		this.materiaSave = new Materia( "","",0,1,true,"");
		this.materiaForm = new FormGroup({
			nombre: new FormControl(),
			semestre: new FormControl(),
			escuela: new FormControl()
		 });
	   }
	
	   get f() { return this.materiaForm.controls; }
	   validate() {	
	   this.materiaForm = this.formBuilder2.group({
				nombre   : ['', Validators.compose([Validators.required, Validators.minLength(4)])],
				semestre:  ['', Validators.compose([Validators.required, Validators.minLength(1)])],
				escuela:  ['', Validators.compose([Validators.required, Validators.minLength(1)])]

		   });
		   }

  	ngOnInit() {
		  this.obtenerEscuela();
		  this.obtenerMateria();
	}
	  
	obtenerMateria(){
		
		this._academiaService.getMateria().subscribe(
			response => {
				if(response){
					this.materiasLista=response.result;
					this.status = response.status;
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

		onKey(event: any) {
			var x=event.which||event.keycode;
				if((x>=48 && x<=57) || x==8 || (x>=35 && x<=40)|| x==46){
					if (event.target.value == "e") {
						return false;
					}else{
						return true;

					}
				}
				else{
					
					return false;
				}
		}
		onSubmitMateria(){
			this.submitted = true;
			this.materiaSave.escuela 	=	this.materiaForm.value.escuela;
			this.materiaSave.nombre 	= 	this.materiaForm.value.nombre;
			this.materiaSave.semestre 	= 	this.materiaForm.value.semestre;
			if(this.materiaForm.value.escuela != null && this.materiaForm.value.nombre != null && this.materiaForm.value.semestre != null){
				this._academiaService.saveMateria(this.materiaSave).subscribe(
				response => {
				 	this.status =response.status;
				 	this.mensaje(this.status);
				 	this.obtenerMateria();
				  	}
				);

			}else{
				alertify.alert('Ingresé información', 'Ingresa todos los datos: Escuela, Nombre de la materia y Nivel(semestre)');
			}
		
				  
		  }
		  
		mensaje(code){
			switch (code) {
				case 0: alertify.alert('Error', 'Error') ; break;
				case 1:  alertify.success('Correcto', 'Correctamente registrado la escuela') ;break;
				case 2:  alertify.success('Mensaje', 'Mensaje') ;break;
				case 9:  alertify.alert('Advertencia', 'Envia los datos') ;break;
				default:  alertify.alert('Error', 'Error');	break;
			}
		}

		obtenerEscuela(){
			this._academiaService.getEscuela().subscribe(
				response => {
					if(response){
						this.escuelasLista=response.result;
						this.status = response.status;
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
}

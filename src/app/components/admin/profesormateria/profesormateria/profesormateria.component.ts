import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import{Materia} from '../../../../models/materia';
import{Escuela} from '../../../../models/escuela';
import{ProfesorMateria} from '../../../../models/profesorMateria';
import{Profesor} from '../../../../models/profesor';
import {AcademiaService} from '../../../../services/academia/academia.service';
import * as alertify from 'alertifyjs'; 
@Component({
  	selector: 'app-profesormateria',
  	templateUrl: './profesormateria.component.html',
	styleUrls: ['./profesormateria.component.css'],
	providers:[AcademiaService]
})
export class ProfesormateriaComponent implements OnInit {
	submitted = false;
	public respuesta;
	public url: string;
	public token;
	public status: String; 
	public profesorMateriaSave: ProfesorMateria;
	public materiasLista: Materia; 
	public profesoresLista: Profesor;
	candidatoForm: FormGroup; 
	constructor(
		public _http: HttpClient,
		private _academiaService: AcademiaService) { 
			this.candidatoForm = new FormGroup({
				materia: new FormControl(),
				profesor: new FormControl()
			 });
			 this.profesorMateriaSave = new ProfesorMateria( "","","",1,true,"","Julio 2019 - Febrero 2020",1,0,0)
	  }

	ngOnInit() {
		this.obtenerMateria();
	this.obtenerProfesor();
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
				},error => {
					var errorMessage  = <any>error;
					if(errorMessage != null){
					console.log('response'+ errorMessage);
				}
			}
		)
	}

	

	obtenerProfesor(){
		this._academiaService.getProfesor().subscribe(
			response => {
				if(response){
					this.profesoresLista=response.result;
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


	onSubmitCandidato(){
		this.submitted = true;
		this.profesorMateriaSave.profesor 	=	this.candidatoForm.value.profesor;
		this.profesorMateriaSave.materia 	= 	this.candidatoForm.value.materia;
	
		if(this.candidatoForm.value.profesor != null && this.candidatoForm.value.materia != null){
			this._academiaService.saveprofesorMateria(this.profesorMateriaSave).subscribe(
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
			case 3:  alertify.alert('Mensaje', 'Ya existe ese profesor con esa materia(semestre)') ;break;
			case 9:  alertify.alert('Advertencia', 'Envia los datos') ;break;
			default:  alertify.alert('Error', 'Error');	break;
		}
	}
	onChangeSelect(profesor){
		this.getMateriasProfesor(profesor);
	}


	
	getMateriasProfesor(profesor:String){
		this._academiaService.getMateriasProfesor(profesor).subscribe(
			response => {
				if(response){
					this.respuesta =response.cursor;
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



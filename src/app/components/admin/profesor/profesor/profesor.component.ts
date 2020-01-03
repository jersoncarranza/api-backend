import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import{Profesor} from '../../../../models/profesor';
import {AcademiaService} from '../../../../services/academia/academia.service';
import * as alertify from 'alertifyjs'; 

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css'],
  providers:[AcademiaService]
})
export class ProfesorComponent implements OnInit {
  submitted = false;
	profesorForm: FormGroup;
	public profesoresLista: Profesor; 
	public profesorSave: Profesor; 
	public status: String; 
	public message: String;
  constructor(
    private formBuilder2: FormBuilder,
		private _academiaService: AcademiaService
  ) { 

	this.profesorSave = new Profesor( "","","",1,"","",true);
	this.profesorForm = new FormGroup({
		nombres: new FormControl(),
		apellidos: new FormControl()
	 });
	
  }
  get f() { return this.profesorForm.controls; }
	validate() {	
	this.profesorForm = this.formBuilder2.group({
			nombres   : ['', Validators.compose([Validators.required, Validators.minLength(5)])],
			apellidos:  ['', Validators.compose([Validators.required, Validators.minLength(5)])]
		});
		}
	  

  	ngOnInit() {
		this.obtenerProfesor();
	}
	
	obtenerProfesor(){
	this._academiaService.getProfesor().subscribe(
		response => {
			if(response){
				this.profesoresLista=response.result;
				console.log('this.profesoresLista'+this.profesoresLista);
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
	
	onSubmitProfesor(){
		this.submitted = true;
		this.profesorSave.nombre = this.profesorForm.value.nombres;
		this.profesorSave.apellidos = this.profesorForm.value.apellidos;
		console.log(this.profesorSave);
			this._academiaService.saveProfesor(this.profesorSave).subscribe(
			response => {
			 this.status =response.status;
			 this.mensaje(this.status);
			  }
		  );
			  
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

}

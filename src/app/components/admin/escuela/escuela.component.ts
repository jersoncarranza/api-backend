import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import{Escuela} from '../../../models/escuela';
import {AcademiaService} from '../../../services/academia/academia.service';
import * as alertify from 'alertifyjs'; 

@Component({
  	selector: 'app-escuela',
  	templateUrl: './escuela.component.html',
	  styleUrls: ['./escuela.component.css'],
	  providers:[AcademiaService]
})
export class EscuelaComponent implements OnInit {
	submitted = false;
	escuelaForm: FormGroup;
	public escuelasLista: Escuela; 
	public escuelaSave: Escuela; 
	public status: String; 
	public message: String;
  	constructor(
		private formBuilder: FormBuilder,
		private _academiaService: AcademiaService,
	  ) { 
		this.escuelaSave = new Escuela( "","","",1,true,"date");
	  }
	  
  	ngOnInit() {
		this.validate();
		this.obtenerEscuela();
  	}

  	onSubmit(){
		this.submitted = true;
		this.escuelaSave.nombre = this.escuelaForm.value.name;
		this.escuelaSave.facultad = this.escuelaForm.value.facultad;
		
		this._academiaService.saveEscuela(this.escuelaSave).subscribe(
			response => {
			 this.status =response.status;
			 this.mensaje(this.status);
			  }
		  );
			  
  	}
			  
	get f() { return this.escuelaForm.controls; }

  	validate() {
  	this.escuelaForm = this.formBuilder.group({
		  name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
		  facultad:  ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      });
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
				//alertify.alert('Error', 'Error') ;
				}
			}
		)
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

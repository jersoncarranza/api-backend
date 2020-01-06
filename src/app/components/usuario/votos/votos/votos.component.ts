import { Component, OnInit } from '@angular/core';
import{AcademiaService} from '../../../../services/academia/academia.service'
import{Materia} from '../../../../models/materia';
import{EstrellasEvaluacion} from '../../../../models/estrellasEvaluacion';
import {UserService } from '../../../../services/user.service';
import * as alertify from 'alertifyjs'; 
@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.css'],
  providers:[AcademiaService,UserService]
})
export class VotosComponent implements OnInit {
	submitted = false;
	public identity;
	public status: String;
	public respuesta:any; 
	public respuestaEstrellas:any;//EstrellasEvaluacion;
	public estrellasEvaluacionSave: EstrellasEvaluacion;
	  
	constructor(
		private _academiaService: AcademiaService,
		private _userService: UserService
  	) { 
		this.identity = this._userService.getIdendity();
		this.estrellasEvaluacionSave = new EstrellasEvaluacion( "","","",0,"",1,true);
	  }

  	ngOnInit() {
		  this.ObtenerlistaProfesoresEvaluar();
  	}

	ObtenerlistaProfesoresEvaluar(){
		this._academiaService.getEvaluarProfesor().subscribe(
			response => {
				if(response){
					this.respuesta	=	response.cursor;
					this.respuestaEstrellas = response.start;
					this.status 	= 	response.status;
					
					var id1:String;
					var id2:String;

					//console.log('+++'+ this.respuestaEstrellas);
					for(var i = 0; i < this.respuesta.length; i++) {
						id1=this.respuesta[i]._id;
						for(var j = 0; j < this.respuestaEstrellas.length; j++) {
							id2=this.respuestaEstrellas[j]._id; 
							if (id1==id2) {
								this.respuesta[i].calificacion = this.respuestaEstrellas[j].promedio;
								this.respuesta[i].estudiantes = this.respuestaEstrellas[j].numerodocumentos;

								//document.getElementById(this.respuesta[i]._id+999).style.visibility = "hidden";	
								//document.getElementById(this.respuesta[i]._id+111).style.visibility = "visible";	

							}
						}

					}

			
					

					}else{
					//	this.status = response.status;	 
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

	valor(idEvaluacionProfesor:string, calificacion:string){
		this.saveEstrellas(idEvaluacionProfesor,calificacion);
	}

	saveEstrellas(idEvaluacionProfesor:string, calificacion: string){
		this.submitted = true;
		var intCalificacion = parseInt(calificacion);
		this.estrellasEvaluacionSave.idEvaluacionProfesor 	=	idEvaluacionProfesor;
		this.estrellasEvaluacionSave.idEstudiante 			=	this.identity._id;
		this.estrellasEvaluacionSave.calificacion 			= 	intCalificacion;
	
		if(this.estrellasEvaluacionSave.idEvaluacionProfesor != null && this.estrellasEvaluacionSave.idEstudiante != null
			 && this.estrellasEvaluacionSave.calificacion != null){
			this._academiaService.saveEstrellasEvaluacion(this.estrellasEvaluacionSave).subscribe(
			response => {
				 this.status =response.status;
				 this.mensaje(this.status);
				 this.ObtenerEstrellasProfesores();
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
			case 3:  alertify.alert('Mensaje', 'Ya existe votaste') ;break;
			case 9:  alertify.alert('Advertencia', 'Envia los datos') ;break;
			default:  alertify.alert('Error', 'Error');	break;
		}
	} 


	ObtenerEstrellasProfesores(){
		this._academiaService.getEstrellasEvaluacionProfesor().subscribe(
			response => {
				if(response){
					this.respuestaEstrellas=response.data;
					this.status 	= 	response.status;
				
					}else{
					//	this.status = response.status;	 
					}
				},
				error => {
					var errorMessage  = <any>error;
					if(errorMessage != null){
					console.log('response'+ errorMessage);
					}
				}
			)
		return this.respuestaEstrellas;
	}

	mouseEnterStartGeneral(div : string){

		document.getElementById(div+999).style.visibility = "hidden";	
		document.getElementById(div+111).style.visibility = "visible";	

	 }
	 
	 mouseEnterStartInd(div : string){
		document.getElementById(div+999).style.visibility = "hidden";	
		document.getElementById(div+111).style.visibility = "visible";
	 }
  

	 mouseLeaveStartGeneral(div : string){
		document.getElementById(div+999).style.visibility = "visible";	
		document.getElementById(div+111).style.visibility = "hidden";
	 } 
	 
	 mouseLeaveStartInd(div : string){
		document.getElementById(div+999).style.visibility = "visible";	
		document.getElementById(div+111).style.visibility = "hidden";

	  }
 
}

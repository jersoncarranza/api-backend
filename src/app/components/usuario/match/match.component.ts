import { Component, OnInit } from '@angular/core';
import {MatchService} from '../../../services/match/match.service';
import{UserService} from '../../../services/user.service';
import{User} from '../../../models/user';
import{Match} from '../../../models/match';
import * as alertify from 'alertifyjs'; 

import {PopupmensajeComponent} from '../popupmensaje/popupmensaje.component'
import {   BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  	selector: 'app-match',
  	templateUrl: './match.component.html',
	  styleUrls: ['./match.component.css'],
	  providers:[UserService]
})
export class MatchComponent implements OnInit {
	//modal
	modalRef: BsModalRef;
	modalRefs: BsModalRef[] = [];
	//
	public user: User;
	public status: Number;
	public message: String;
	public identity; 
	//Date candidato
	public matchCandidato: User;
	public name:String;
	public image: String;
	public imageFrontCandidato:String;
	public idCand:String;
	//Match
	public match:Match;
	public notify: Number;
  	constructor(
		public _matchService: MatchService,
		private _userService: UserService,
		private modalService: BsModalService
  	) { 
		this.identity = this._userService.getIdendity();
		this.match = new Match(1,"",1,false,"","");
	  }

    ngOnInit() {
		this.meetMatch();
    }

    meetMatch(){
		this._matchService.getMatch().subscribe(
			response =>{
				this.message = response.message;
				this.status=response.status;
				if (this.status == 1) {
					this.matchCandidato = response.candidato;
					if(	this.matchCandidato != null){
						
						this.name  = this.matchCandidato.name;
						this.image = this.matchCandidato.image;
						this.idCand= this.matchCandidato._id;
						//si el/la candidat@ no tiene image y EL usuario es hombre
						if (this.image == null && this.identity.genero=='H') {//
							this.imageFrontCandidato = 'assets/user/mujer1.jpg';
						}

						if (this.image == null && this.identity.genero=='M') {//
							this.imageFrontCandidato = 'assets/user/hombre1.jpg';
						}
				
					}else{
						this.message='Por ahora no hay mas!! ';
					}
				}
			},
			error=>{
				var errorMessage = <any>error;
				console.log('error' + errorMessage);
				if(errorMessage != null){
					this.message = errorMessage.message;
					this.status  = errorMessage.status; 
				}
			}
		)
	}
	
	clickNotLike(){

		this.saveMatch(false);
	}
	clickLike(){
		this.saveMatch(true);
	}
	saveMatch(like: boolean) {
		this.match.liked = like;
		this.match.viewed =1;
		this.match.emitter =this.identity._id;
		this.match.receiver=  this.idCand;
		this.match.estado = 1;

		this._matchService.saveMatch(this.match).subscribe(
			response =>{
				this.message = response.message;
				this.status=response.status;
				this.notify = response.notify;
				if (this.status == 1) {
					this.mensajeOk(like, this.notify);
					this.meetMatch();
				}else{
					this.mensajeEstado(this.status);
				}
			},
			error=>{
				var errorMessage = <any>error;
				console.log('error' + errorMessage);
				if(errorMessage != null){
					this.message = errorMessage.message;
					this.status  = errorMessage.status; 
					this.mensajeEstado(this.status);
				}
			}
		)

	}


	mensajeOk(like:Boolean, notify:Number){
	
		
		
		if(like ==true && notify== 1){
			this.openModal();
		}

		if(like==false){
			alertify.error('No es tu Match !Muy horrible', 'Correctamente ');
		}
		if(like ==true){
			alertify.success('Que bien !', 'Correctamente');
		}
	}

	mensajeEstado(code){
		switch (code) {
			case 1: alertify.success('Estado Match', 'Correctamente modificado el estado'); break;
			case 0: alertify.alert('Error código', 'Error en el servidor #2'); this.message = 'Error en el servidor #2'; break;
			case 4: alertify.alert('Error código', 'No se ha podido actualizar el estado del pago'); break;
			default: alertify.alert('Error código', 'No hay respuesta del servidor');  this.message='No hay respuesta del servidor';	break;
		}
	}

	openModal(){
		let user = this.identity;
		localStorage.setItem('dataUserMatch', JSON.stringify(user));
		localStorage.setItem('dataUserCandidato', JSON.stringify(this.matchCandidato));
		let config = 	{
			class: 'modal-md',
			initialState: {
			title: 'Mensaje',
			data: {
				user,
				candidato:this.matchCandidato
				}
			}
		} 
		this.modalRef = this.modalService.show(PopupmensajeComponent, config);
		this.modalRef.content.closeBtnName = 'Close';
		
	}
}

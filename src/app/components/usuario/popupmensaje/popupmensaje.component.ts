import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import{GLOBAL} from '../../../services/global';
import{User} from '../../../models/user';
import{Message} from '../../../models/message';
import {MessageService} from '../../../services/message/message.service';
import{UserService} from '../../../services/user.service';
import * as alertify from 'alertifyjs'; 
import {Router} from '@angular/router'; 
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  	selector: 'app-popupmensaje',
  	templateUrl: './popupmensaje.component.html',
  	styleUrls: ['./popupmensaje.component.css'],
  	providers:[MessageService,UserService]
})
export class PopupmensajeComponent implements OnInit {
	@ViewChild('emailmensaje', {static: false}) myInputVariable: ElementRef;
	modalRef: BsModalRef;
  	public message: Message;
  	public identity: User;
  	public token;
	public url: string;
	public dataCandidato:any;
  	constructor(
		private bsModalRef: BsModalRef,
    	private _messageService: MessageService,
    	private _userService: UserService
  	) {
    this.identity = this._userService.getIdendity();
    this.token    = this._userService.getToken();
    this.url      = GLOBAL.url;
    this.message  = new Message('','','','', this.identity._id ,'');
   } 

	ngOnInit() {
		this.dataCandidato = JSON.parse( localStorage.getItem('dataUserCandidato'));
	}

	envioMensaje(){
		var msj=this.myInputVariable.nativeElement.value.trim();
		if (msj.length > 5 ) {
			this.addMensaje();
		}else{
			alertify.alert('Advertencia',"Escríbele algo agradable", function(){
				alertify.message('OK');  
			});
		}
	}
	
	close() {
        this.bsModalRef.hide();
    } 
	
	addMensaje(){
		var msgSend =this.myInputVariable.nativeElement.value.trim();
		this.message.text 		= msgSend;
		this.message.receiver 	= this.dataCandidato._id
		this._messageService.addMessage(this.token, this.message).subscribe(
			response => {
				if(response.message){
					if(response.status == 1){
						alertify.success('Que bien! Tu mensaje se ha enviado', 'Correctamente');
						//localStorage.removeItem("dataUserCandidato");
						this.close(); 
						//this._router.navigate(['/mensajes']);
					}else{
						alertify.error('Error no se pudo enviar el mensaje', 'Error');
					}


				}
			},
			error => {
				console.log(<any>error);
			}
		)
		
	}
				
}
			
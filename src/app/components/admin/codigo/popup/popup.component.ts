import { Component, OnInit,ElementRef,ViewChild, ɵConsole, } from '@angular/core';
import { ModalModule,BsModalService ,BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';
 import {CodigoService} from '../../../../services/codigo/codigo.service';
 import {GLOBAL} from '../../../../services/global';
 import {Mail} from '../../../../models/mail';
 import {MailService} from '../../../../services/mail/mail.service'
 import * as alertify from 'alertifyjs'; 
@Component({
  selector: 'app-popup', 
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})


export class PopupComponent implements OnInit {
	@ViewChild('emailmensaje', {static: false}) myInputVariable: ElementRef;
	
	form: FormGroup;
	//form = new FormGroup({});
	submitted = false;
	public url: string;
	public mail: Mail;
	public statusmsg:String;
 	constructor(
		private modalRef: BsModalRef,	
		private formBuilder: FormBuilder,
		private _mailService : MailService,
		private _codigoService: CodigoService) {
			this.url = GLOBAL.url;
			this.mail   = new Mail("","","","","");
		}
  

  	ngOnInit() {
		this.habilitar();
  	}
  	onSubmit(){
		this.submitted = true;
	}

	public user:any;
	public enabled:Boolean;
	public onOff:Boolean;
	public nota:String;
	public message:String;
	habilitar(){	
		if (typeof(Storage) !== "undefined") {
			this.user = JSON.parse(localStorage.getItem("dataUser"));
			
			if (this.user.enabled == false && this.user.estado == 0) {
				this.nota='Código ya usado, Ya lo usaron';
				this.enabled=false;
			}

			if (this.user.enabled == false && this.user.estado == 1) {
				this.nota='Falta habilitar; Revisar la orden de pago';
				this.onOff=false;			
			}

			if (this.user.enabled == true && this.user.estado == 1) {
				this.nota = 'Ya esta habilitado; Y listo para usarse';
				this.onOff=true;
			}
			//
			this.toggleInit(this.onOff);
			// LocalStorage disponible
		} else {
			alert('Este navegador no tiene las caracteristicas necesarias; trabaje con otro navegador')
			// LocalStorage no soportado en este navegador
		}
	}
	
	
	private toggleNumber: Boolean;
	toggle(){
		const toggleContainer = document.getElementById('toggle-container');
		this.toggleNumber = !this.toggleNumber;
		console.log(this.toggleNumber)
		this.user.enabled=this.toggleNumber;
		this._codigoService.putEditCode('',this.user).subscribe(
			response => {
				var res = response;
			//	console.log(res.status);
				if (res.status==1) {
					if (this.toggleNumber) {
						toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
						toggleContainer.style.backgroundColor = 'dodgerblue';
					} else {
						toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
						toggleContainer.style.backgroundColor = '#D74046';
					}
				}
				this.mensajeEstado(res.status);
			}),error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.mensajeEstado(errorMessage.error.status);
				}
			};
	}

	toggleInit(onOff:Boolean){
		const toggleContainer = document.getElementById('toggle-container');
		if (onOff) {
			toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
			toggleContainer.style.backgroundColor = 'dodgerblue';
		} else {
			toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
			toggleContainer.style.backgroundColor = '#D74046';
		}
	}

	mensajeEstado(code){
		switch (code) {
			case 1: alertify.alert('Estado código', 'Correctamente modificado el estado'); break;
			case 2: alertify.alert('Error código', 'Error en el servidor #2'); this.message = 'Error en el servidor #2'; break;
			case 4: alertify.alert('Error código', 'No se ha podido actualizar el estado del pago'); break;
			default: alertify.alert('Error código', 'No hay respuesta del servidor');  this.message='No hay respuesta del servidor';	break;
		}
	}

	muestra_oculta(id){
		if (document.getElementById){ //se obtiene el id
			var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
			el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
			}
	}

	envioMail(){
		var msgSend =this.myInputVariable.nativeElement.value.trim();
		var msgLen =  msgSend.length ;
		// mensaje = mensaje.trim();
		if (msgLen >= 10 ) {
			this.mail.from = "jersoncarranza2@gmail.com";
			this.mail.text =  msgSend; 
			this.mail.to = this.user.correo_peticion;
			this.mail.subject = "Respuesta código de Registro";
			// alert('Listo');
			
			alertify.confirm('Confirmar Correo','Enviar mensaje', 
			() => {this.enviarMail(this.mail) ;},
			() => { alertify.error('Cancelado')}).set('labels', {ok:'Enviar', cancel:'Cancelar'});		
		}else{

			alertify.alert('Advertencia del mensaje', 'Llena el contenido del mensaje por lo menos 10 letras!', function(){ });
		}
	}
	
	public enviarMail(inputMail) {
		console.log('inputMail'+inputMail);
		this._mailService.envioGmail(inputMail).subscribe(
			response =>{
				this.statusmsg = response.status;
				this.mensajeMail(this.statusmsg)
			},error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.mensajeMail(errorMessage.error.status);
			}}
		);
		
	};

	mensajeMail(code){
		switch (code) {
			case 1: alertify.alert('Mail', 'Mail enviado correctamente');this.myInputVariable.nativeElement.value=''; break;
			case 2: alertify.alert('Error Mail', 'No se envio el correo'); break;
			default:  this.message='No hay respuesta del servidor';	break;
		}
	}
	
}

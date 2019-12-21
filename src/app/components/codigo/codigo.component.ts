import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CodigoService} from '../../services/codigo/codigo.service'
import {UploadService} from '../../services/upload.service';
import{MailService} from '../../services/mail/mail.service';
import { GLOBAL } from 'src/app/services/global';
import {Codigo} from '../../models/codigo';
import {Mail} from '../../models/mail';
import * as alertify from 'alertifyjs';
@Component({
	selector: 'app-codigo',
	templateUrl: './codigo.component.html',
	styleUrls: ['./codigo.component.css'],
	providers:[UploadService]
})
export class CodigoComponent implements OnInit {
	//@ViewChild('myInput') myInputVariable: ElementRef;
	@ViewChild('myInput', {static: false}) myInputVariable: ElementRef;
    submitted = false;
	registerForm: FormGroup;
	public codigo: Codigo;
	public mail: Mail;
	public status: String;
	public statusmsg:String;
	public message:String;
	public url;
    constructor(
		private _uploadService: UploadService,
		private _codigoService: CodigoService,
		private _mailService : MailService,
		private formBuilder: FormBuilder) { 
		this.codigo = new Codigo("","",2, "", "", "",  "","");
		this.mail   = new Mail("","","","","");
		this.url  = GLOBAL.url; 
		this.statusmsg='0';
    }

    ngOnInit() {
		this.validate();
	}
	
	get f() { return this.registerForm.controls; }
    validate() {
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.minLength(4)]],
			textarea: ['', Validators.required]
        });
	}
	
	onSubmit(){
		this.submitted = true;
		if(this.registerForm.valid &&   this.filesToUpload && this.filesToUpload.length){
			this.codigo.descripcion    = this.registerForm.value.textarea;
			this.codigo.correoPeticion = this.registerForm.value.email;
			
			this._codigoService.saveCodigo(this.codigo).subscribe(
				response => {
					if (response.message) {
						this.codigo.code = response.message.code;
						if (this.filesToUpload && this.filesToUpload.length) {
							this._uploadService.makeFileRequestPay(this.url+'upload-image-pay/'+response.message._id,[], this.filesToUpload,'image')
							.then((result: any)=>{
								this.codigo.file  = result.image;

								this.status = result.status;
								this.mensaje(this.status);
	
								this.mail.from = "jersoncarranza2@gmail.com";
								this.mail.text =  this.msgSend(this.codigo.code); 
								this.mail.to = this.codigo.correoPeticion.trim();
								this.mail.subject = "Codigo de Registro a Validar "
								this.enviarMail(this.status);

								this.registerForm.reset();
								this.myInputVariable.nativeElement.value = '';
							});
						}else{
							this.mensaje(this.status);
						}
					}else{
						this.mensaje(this.status);
					}
				},	error => {
					var errorMessage = <any>error;
					if(errorMessage != null){
						this.mensaje(this.status);
					}
				}
			)			
		}else{
			alert('Ingrese todos los campos');
		}
	}
	
	enviarMail(status: String) {
	
		if (status == '1') {
			this._mailService.envioGmail(this.mail).subscribe(
				response =>{
					this.statusmsg = response.status;
				}
			)
		}
	};


	msgSend(code: String){
		let msj: String;
		msj='Hola, Amigo !<br/> Gracias Por unirte, en breves momentos se activara tu codigo <b>'+ code  + '</b> para que te registre. Te enviaremos otro mail tras VALIDAR la informacion. <br/> Nota: Se han omitido las tildes.';
		return msj;
	}

	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	mensaje(code){
		switch (code) {
			case 1: this.message = 'Registrado correctamente. Inicia Sesión'; break;
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

import { Component, OnInit ,EventEmitter, Output,TemplateRef  } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'; 
import { GLOBAL } from 'src/app/services/global';
import{CodigoService} from '../../../../services/codigo/codigo.service';
import{UserService} from '../../../../services/user.service'
// import{ModalService} from '../modal';
import { User } from 'src/models/user';

import {PopupComponent} from '../popup/popup.component'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
 
@Component({
  	selector: 'app-listacodigo',
  	templateUrl: './listacodigo.component.html',
	  styleUrls: ['./listacodigo.component.css'],
	  providers:[CodigoService,UserService]
})
export class ListacodigoComponent implements OnInit {
	modalRef: BsModalRef;
	public identity;
	public page: number;

	public prev_enable: Boolean;
	public next_page: number;
	public prev_page: number;

	public total: number;
	public pages: number;

	public users;
	public user: User;
	public status: string;

	public url: string;

	bodyText: string;//modal
  constructor(
	private _userService: UserService,	
	private _route: ActivatedRoute,
	private _router: Router,
	private _codigoService: CodigoService,
	// private _modalService:ModalService,
	private modalService: BsModalService
	) {   
		this.identity = this._userService.getIdendity();
		this.prev_enable = false;
		this.url = GLOBAL.url;
	 }

  	ngOnInit() {
		this.bodyText = 'This text can be updated';
		if (this.metAdmin()) {
			this.actualPage();
		}else{
			this._router.navigate(['/denegado']);
		}
  	}

	  
	metAdmin(){

		if (this.identity.role == 'ADMIN') {
            return true;
			
		}else{
			this._router.navigate(['/denegado']);
            return false;
		}
	}
  	actualPage(){
        this._route.params.subscribe(params =>{
		let page : number = params['page'];
		this.page = page;					
		if(!page || (page == undefined)){
			page= 1;
			this.next_page = 2;
			this.prev_page = 1;
		}else{
			this.next_page = Number(page) + 1;
			this.prev_page = page - 1;
		
			if(this.prev_page <= 0){
			this.prev_page=1;
			}
		}

		//devolver listados
		this.getUsers(page);
	})
    }
    
    getUsers(page){
	this._codigoService.getuserCode('',page).subscribe(
			response =>{
				if(!response.users){
					this.status = 'error'
				}else{
					this.total = response.total_items;
					this.users = response.users;
					this.pages = response.pages;
					this.status = response.status;
					if(page > this.pages){
						this._router.navigate(['/admin', 1]);
					}
				}
			},
			error =>{
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.status = 'error';
				}
					
			}
		)
	}


	/*********/
	// openModal(id: string, user:User) {
    //     this._modalService.open(id);
    // }

    // closeModal(id: string) {
    //     this._modalService.close(id);
	// }
	
	
	// @Output() sended = new EventEmitter();
	// sendPublication(id){
	// 	this._modalService.open(id);
	// }

	/****** */
	// openModal2(template: TemplateRef<any>, user) {

	openModal2(user) {

		localStorage.setItem('dataUser', JSON.stringify(user));

		this.modalRef = this.modalService.show(PopupComponent, 
			{
			class: 'modal-lg',
		  	initialState: {
			title: 'Modal Pago',
			data: {user}
	
		  }
		});
	  }

}

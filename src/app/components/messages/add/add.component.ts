
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import{UserService} from '../../../services/user.service';
import{GLOBAL} from '../../../services/global';
import{User} from '../../../models/user';
import{Message} from '../../../models/message';
import {FollowService} from '../../../services/follow.service';
import {MessageService} from '../../../services/message/message.service';
import{Follow} from '../../../models/follow';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers:[FollowService, MessageService]
})
export class AddComponent implements OnInit {

		public title: string;
		public message: Message;
		public identity: User;
		public token;
		public url: string;
		public status: string;
		public follows;

 	 constructor(
		  private _route: ActivatedRoute,
		  private _router: Router,
		  private _followService: FollowService,
		  private _messageService: MessageService,
		  private _userService: UserService
	  ) { 
		  this.title='Enviar mensaje';
		  this.identity = this._userService.getIdendity();
		  this.token = this._userService.getToken();
		  this.url = GLOBAL.url;
		  this.message = new Message('','','','', this.identity._id ,'');
	  }	

 	 ngOnInit() {
		  this.getMyFollows();
	  }
	  
	  onSubmit(form){
		  this._messageService.addMessage(this.token, this.message).subscribe(
			  response => {
				  if(response.message){
					  this.status = 'success';
					  form.reset();
				  }
			  },
			  error => {
				  this.status = 'error';
				  console.log(<any>error);
			  }
		  )
	  }

	  getMyFollows(){
		  this._followService.getMyFollows(this.token).subscribe(
			  response =>{
				  this.follows = response.follows;
			  },
			  error =>{
				  console.log(<any>error);
			  }
		  )
	  }

}

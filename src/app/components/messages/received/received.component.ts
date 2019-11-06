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
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit {

    
  public title: string;
  public messages: Message[];
  public identity: User;
  public token;
  public url: string;
  public status: string;

  public pages;
  public total;
  public page;
  public next_page;
  public prev_page;
  public userPageId;

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
   }

  ngOnInit() {
  this.actualPage();
}

actualPage(){
  this._route.params.subscribe(params =>{
    let page = +params['page'];
    this.page = page;

    if(!params['page']){
      page = 1;
    }

    if(!page){
      page=1;
    }else{
      this.next_page =page+1;
      this.prev_page = page-1;

      if(this.prev_page <= 0){
        this.prev_page = 1;
      }
    }

    this.getMessages(this.token, this.page);

  })
}

getMessages(token, page){
  this._messageService.getMyMessages(token, page).subscribe(
    response =>{
      if(response.messages){
        this.messages = response.messages;
        console.log(this.messages)
      }else{
        this.messages = response.messages;
        this.total	= response.total;
        this.pages = response.pages;
      }
    },
    error =>{
      console.log(<any>error);
    }
  )
}


}

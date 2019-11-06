import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from './services/user.service';
import {GLOBAL} from './services/global';
import { $ } from 'protractor';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit, DoCheck {
  	public title : string;
	public identity;
	public url: string;
    constructor (
		private _route: ActivatedRoute,
		private _router: Router,
      	private _userService: UserService 
    ){
		this.url = GLOBAL.url;
      	this.title = 'NGsocial'
    }

    ngOnInit(){
		this.identity = this._userService.getIdendity();
	}

	ngDoCheck(){
		this.identity= this._userService.getIdendity();	
	}

	logout(){
		localStorage.clear();
		this.identity = null;
		this._router.navigate(['/']);
	}


}

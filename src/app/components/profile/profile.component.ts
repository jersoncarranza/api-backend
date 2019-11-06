import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import{User} from '../../models/user';
import {Follow} from '../../models/follow';
import {UserService } from '../../services/user.service';
import {FollowService } from '../../services/follow.service';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[UserService, FollowService]
})
export class ProfileComponent implements OnInit {

	public title: string;
	public user  : User;
	public status : string;
	public identity;
	public token;
	public stats;
	public url;
	public follow;
	public id;

	public following: Boolean;
	public followed:  Boolean;

  	constructor(
		  private _route: ActivatedRoute,
		  private _router: Router,
		  private _userService: UserService,
		  private _followService: FollowService
	  ) { 
		  this.title = 'Perfil';
		  this.identity = this._userService.getIdendity();
		  this.token = this._userService.getToken();
		  this.stats = this._userService.getStats();
		  this.url = GLOBAL.url;
		  this.following = false;
		  this.followed = false;
	  }

  	ngOnInit() {
		  this.loadPage();
	  }

	  loadPage(){
			this._route.params.subscribe(params =>{
				let id = params['id'];	
				this.id=id;
				this.getCounters(id);
				this.getUser(id);
			})
	  }
	  
	  getUser(id){
		  	this._userService.getUser(id).subscribe(
			  response =>{
				if(response.user){
					this.user = response.user;
					console.log('listo '+this.user._id);
					if(response.following && response.following._id){
						this.following = true;
					}else{
						this.following = false;
					}


					if(response.followed && response.followed._id){
						this.followed = true;
					}else{
						this.followed = false;
					}

				}else{
					this.status = 'error';
				}	
			  	},
				  error =>{
					  this._router.navigate(['/perfil', this.identity._id])
					}
				);
	  }

	getCounters(id){
	
		this._userService.getCounters(id).subscribe(
		response =>{
			   this.stats = response;
			 
			},
			error =>{
				this._router.navigate(['/perfil', this.identity._id])
			  }
		  );
	}

	followUser(followed){
		var follow = new Follow('', this.identity._id, followed);
		this._followService.addFollow(this.token, follow).subscribe(
			response =>{
				this.following = true;
			},
			error =>{

			}
		)
	}

	unfollowUser(followed){
	
		this._followService.deleteFollow(this.token, followed).subscribe(
			response =>{
				this.following = false;
			},
			error =>{

			}	
		)
	}

	public followUserOver;
	mouseEnter(user_id){
		this.followUserOver = user_id;
	}

	mouseLeave(){
		this.followUserOver = 0;
	}



}

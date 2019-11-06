import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import{UserService} from '../../services/user.service';
import{GLOBAL} from '../../services/global';
import{User} from '../../models/user';
import {FollowService} from '../../services/follow.service';
import{Follow} from '../../models/follow';
import { TouchSequence } from 'selenium-webdriver';
@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
  providers:[UserService, FollowService]
})
export class FollowingComponent implements OnInit {

  	public url: string;
  	public title: string;
  	public token;
  	public identity;
	public user: User;
	public page: number;

	public prev_enable: Boolean;
	public next_page: number;
	public prev_page: number;

	public total: number;
	public pages: number;
	public users: User[];
	public follows; 
	public following;
	public status: string;

	public userPageId:string;
  constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _followService: FollowService
	) {
		this.title='Usuarios seguidos por ';
		this.user = this._userService.getIdendity();
		this.identity = this.user;
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
		this.prev_enable = false;
	}

	ngOnInit() {
		this.actualPage();
		this.prev_enable = false;
	}

  	actualPage(){
        this._route.params.subscribe(params =>{
		let id = params['id'];
		this.userPageId = id;
		let page : number = params['page'];
     	//console.log('0 - page ' + params['page']);  
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
      //devolver  listados
	  //this.getFollows(id, page);
	  
	  this.getUser(this.userPageId, page);

    })
  }

  getFollows(id, page){
    this._followService.getFollowing(this.token, id, page).subscribe(
      response =>{
      if(!response.follows){
        this.status = 'error'
      }else{
		  //users_follow_me
		  this.total = response.total;
		  this.following = response.follows;
		  this.pages = response.pages;
		  this.follows = response.users_following;
		  	
		if(page > this.pages){
			this._router.navigate(['/siguiendo',id, 1]);
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
	  
  //public user: User;
  getUser(user_id, page=1){
	  this._userService.getUser(user_id).subscribe(
		  response =>{
			  if(response.user){
				  this.user = response.user;
				  this.getFollows(user_id,page);
			  }else{
				  this._router.navigate(['/home']);
			  }
		  },    
		  error =>{
			var errorMessage = <any>error;
			if(errorMessage != null){ this.status = 'error'; }
		  }
	  );
  }

  public followUserOver;
  mouseEnter(user_id){
    this.followUserOver = user_id;
  }

  mouseLeave(user_id){
    this.followUserOver = 0;
  }

  followUser(followed){
		var follow = new Follow('', this.identity._id, followed);

		this._followService.addFollow(this.token, follow).subscribe(
		response =>{
			if(!response.follow){
			this.status = 'error';
			}else{
			this.status = 'success';
			this.follows.push(followed);
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


	unfollowUser(followed){
	var follow = new Follow('', this.identity._id, followed);

	this._followService.deleteFollow(this.token, followed).subscribe(
		response =>{

		var search = this.follows.indexOf(followed);

			if(search != -1){
			this.follows.splice(search,1);
			this.status = 'success';
			}else{
			this.status = 'error';
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


}

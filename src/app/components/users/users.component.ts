import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'; 
import{UserService} from '../../services/user.service';
import{GLOBAL} from '../../services/global';
import{User} from '../../models/user';
import {FollowService} from '../../services/follow.service';
import{Follow} from '../../models/follow';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UserService, FollowService]
})
export class UsersComponent implements OnInit {

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
	public status: string;

  	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _followService: FollowService
	) {
		this.title='Gente';
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

			  //devolver listados
			  this.getUsers(page);
		  })
	  }

	  getUsers(page){ 
		  this._userService.getUsers(page).subscribe(
			  response =>{
				if(!response.users){
					this.status = 'error'
				}else{
					this.total = response.total;
					this.users = response.users;
					this.pages = response.pages;
					this.follows = response.users_following;
			
					if(page > this.pages){
						this._router.navigate(['/gente', 1]);
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

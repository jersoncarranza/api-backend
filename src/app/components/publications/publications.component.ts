import { Component, OnInit ,Input} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import{User} from '../../models/user';
import {Follow} from '../../models/follow';
import {UserService } from '../../services/user.service';
import {FollowService } from '../../services/follow.service';
import {GLOBAL} from '../../services/global';
import {TimelineService} from '../../services/timeline.service';
import {Publication} from '../../models/publication';
import * as $ from 'jquery'; 
@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [UserService, TimelineService]
})
export class PublicationsComponent implements OnInit {

  public identity;
	public token;
	public title: string;
	public url: string;

	public status: string;
	public page: number; 
	public total: number;
	public pages: number;
	public publications: Publication[];
	public itemPerPage;
	@Input() user: string;
	
  constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _publicationService: TimelineService

	) { 
		this.title='Publicaitons';
		this.identity = this._userService.getIdendity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.page = 1;
	}

  ngOnInit() {
	  this.getPublications(this.user, this.page)
  }

  getPublications(user, page:number , adding = false){
	  this._publicationService.getPublicationsUser(this.token, user, page).subscribe(
		  response => {
			  if(response.publications){
					
				  this.total = response.total_items;
					this.pages = response.pages;
					
					if(!adding){
						this.publications = response.publications;
					}else{
						var arrayA = this.publications;
						var arrayB = response.publications;
						this.publications = arrayA.concat(arrayB);
						$("html, body").animate({ scrollTop: $('body').prop("scrollHeight")}, 500);		
					}
				//if(page > this.pages){
					//this._router.navigate(['/home']);
				//}
				}else{
					this.status = 'error';	 
				}
			},
			error => {
				var errorMessage  = <any>error;
				if(errorMessage != null){
				
				}
			}
		)
	}

	//ver boton mas
	
	public noMore = false;
	viewMore(){
		this.page += 1; 
		if(this.page == (this.pages)){
			this.noMore=true;
		}
		this.getPublications(this.user, this.page, true);
	}
	

	/*
	refresh(event){
	  this.getPublications(1);
	}
	*/
}

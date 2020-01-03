import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Publication} from '../../models/publication'
import {UserService} from '../../services/user.service';
import {TimelineService} from '../../services/timeline.service';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery'; 
//var alertify = require('alertify.js');
import * as alertify from 'alertifyjs';

import { GLOBAL } from 'src/app/services/global';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UserService, TimelineService]
})
export class TimelineComponent implements OnInit {

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

	public publicationServicePublic : TimelineService;
	  
	public showImage:string;


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _publicationService: TimelineService,
		private _http: HttpClient

	) { 
		this.title='Inicio';
		this.identity = this._userService.getIdendity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.urlcloudinary;
		this.page = 1;
	}

		ngOnInit() {
				this.getPublications(this.page);
		}

	  getPublications(page:number , adding = false){
		  this._publicationService.getPublications(this.token, page).subscribe(
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
							

						//var objDiv = document.getElementById("publications");
						//objDiv.scrollTop = objDiv.scrollHeight;
						//$( "div.publications" ).scrollTop( 300 );
						//$('#publications').scrollTop(1000000);
						//$("#publications").scrollTop($("#publications")[0].scrollHeight);
							
						}

						if(page > this.pages){
							//this._router.navigate(['/home']);
						}

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

	  public noMore = false;
	  viewMore(){
		  this.page += 1; 
		  if(this.page == this.pages){
			  this.noMore=true;
		  }
		  this.getPublications(this.page, true);
	  }

	  refresh(event=null){
		this.getPublications(1);
	  }

	  showThisImage(id){
		this.showImage = id;
	  }

	  hideThisImage(id){
		  this.showImage='0';
		  
	  }

	deletePublication(id){
		// this._publicationService.deletePublication
		this._publicationService.deletePublication(this.token, id).subscribe(
			response => {
				this.refresh();
			},
			error =>{
				console.log(<any>error);
			});
	
	}

	 myfunction(id) {
		let headers = new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization', this.token);
		return this._http.delete(this.url + 'publication/' + id,{headers:headers});
	}

	deletePublicationService(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization', token);
		return this._http.delete(this.url + 'publication/' + id,{headers:headers});
	}
	

	  
}

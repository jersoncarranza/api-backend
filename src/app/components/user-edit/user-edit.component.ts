import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import{ User} from '../../models/user';
import{UserService} from '../../services/user.service';
import { JsonpInterceptor } from '@angular/common/http';
import {UploadService} from '../../services/upload.service';
import{GLOBAL} from '../../services/global';
import axios from 'axios';
import $ from 'jquery';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[UserService, UploadService]
})
export class UserEditComponent implements OnInit {

	public title: string;
	public user: User;
	public identity;
	public token;
	public status: string;
	public message: string;
	public url: string;
	public urlperfil:string;
	public state;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _uploadService: UploadService,

	) {
		this.title='Perfil';
		this.user = this._userService.getIdendity();
		this.identity = this.user;
		this.token = this._userService.getToken();
		this.url = GLOBAL.urlcloudinary;	
		this.state = {
			selectedFile: null,
			selectedFiles: null
		},
		this.urlperfil='https://res.cloudinary.com/djempmk2c/image/upload/';
	}

 	ngOnInit() {
		// console.log('user-edit se ha cargado')
	}

	onSubmit(){
		this._userService.updateUser(this.user).subscribe(
			response =>{
				if(!response.user){
					this.status = 'error';
					this.message = response.message;
				}else{
					this.status = 'success';
					localStorage.setItem('identity',JSON.stringify(this.user));
					this.identity = this.user;

					if(this.filesToUpload && this.filesToUpload.length){
						//Subida de imagen de usuario
						this._uploadService.makeFileRequest(this.url + 'upload-user-cloudinary/'+ this.user._id, [], this.filesToUpload, this.token, 'image')
						.then((result:any)=>{
							this.user.image = result.user.image;
							localStorage.setItem('identity', JSON.stringify(this.user))
						});
					}
					
					/*
					const data = new FormData();
					data.append( 'profileImage', this.state.selectedFile, this.state.selectedFile.name );
					axios.post(this.url + 'upload-user-cloudinary/', data,{
						headers: {
							'accept': 'application/json',
							'Accept-Language': 'en-US,en;q=0.8',
							'Content-Type': `multipart/form-data;`,
						}})
					*/

						/*
						this._uploadService.makeFileAmazonRequest(this.url + 'upload-image-user-aws/'+ this.user._id, [], this.filesToUpload, this.token, 'image')
					.then((response:any) =>{
						if ( 200 === response.status ) {
							if( response.data.error ) {
								if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
									alert('Max size: 2MB');
								} else {
									console.log( response.data );
									alert(response.data.error);
								}
							} else {
								// Success
								let fileName = response.data;
								console.log( 'filedata', fileName );
								alert('File Uploaded');
						
							}
						}
					})
					*/
					


				}
			},
			error=>{
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.status = 'error';
					
				}
			}
		)
	}

	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	logout(){
		localStorage.clear();
		this.identity = null;
		this._router.navigate(['/login']);
	}
}

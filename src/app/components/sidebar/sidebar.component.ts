import { Component, OnInit, Output , Input, EventEmitter} from '@angular/core';
import {UserService} from '../../services/user.service';
import { GLOBAL } from 'src/app/services/global';
import {Publication} from '../../models/publication';
import {TimelineService} from '../../services/timeline.service'; //PublicationService
import {UploadService} from '../../services/upload.service';
//*import { EventEmitter } from '@angular/core';
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[UserService, TimelineService, UploadService]
})
export class SidebarComponent implements OnInit {
  public identity;
  public token;
  public stats;
  public url;
  public status;
  public publication: Publication;

  public send:string;
  constructor(
    private _userService: UserService,
	private _publicationService: TimelineService,
	private _uploadService: UploadService
  ) {
    this.identity = this._userService.getIdendity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url  = GLOBAL.url; 
    this.publication = new Publication("","","","", this.identity._id);   
	this.send = 'false';
	}

  ngOnInit() {
  }
	  
  	onSubmit(newPubForm, $event){
			this._publicationService.addPublication(this.token, this.publication).subscribe(
				response =>{
					if(response.publication){
						
						if(this.filesToUpload && this.filesToUpload.length){
							// Subir Publicacion  con Imagen
							this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+ response.publication._id, [], this.filesToUpload, this.token, 'image')
							.then((result: any) =>{
								this.publication.file  = result.image;
								this.status = 'success';
								newPubForm.reset();
								//this._router.navigate(['/timeline']);
								this.sended.emit(this.send='true');
							});
						}else{
							this.status = 'success';
							newPubForm.reset();
							//this._router.navigate(['/timeline']);
							this.sended.emit(this.send='true');
						}										
					}else{
						this.status = 'error';
					}
				},
				error => {
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

	@Output() sended = new EventEmitter();
	
	sendPublication(event){
		this.sended.emit(this.send='true');
		//console.log(event);
	}

}

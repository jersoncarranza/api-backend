import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  
	public identity;
	public title:string; 
	public user: User
	public status: string;
  	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	  ) { 
		this.title = 'Registrate';
		this.user = new User(
		"",
        "",
        "",
        "",
        "",
        "ROLE_USER",
        "",
		"",
		""
		);
  	}

  ngOnInit() {
		this.verifyLogin();
  }

  /*register(form) {
    console.log(form.value);
    console.log(form.touched);
    console.log(form.submitted);   
  }*/

  verifyLogin(){
	this.identity = this._userService.getIdendity();
	if(this.identity != null){
		this._router.navigate(['/']);
	}
  }

  onSubmit(){
	  //console.log(this.user);
	  this._userService.register(this.user).subscribe(
		  response => {
			  if(response.user && response.user._id){
				  //console.log(response.user)
				  this.status = 'success';
			  }else{
				  this.status ='error';
			  }
		  },
		  error =>{
			  console.log(<any>error)
		  }
	  );
	//  console.log(this.email)
  }

	MustMatch(controlName: string, matchingControlName: string) {
		return (formGroup: FormGroup) => {
			const control = formGroup.controls[controlName];
			const matchingControl = formGroup.controls[matchingControlName];

			// return null if controls haven't initialised yet
			if (!control || !matchingControl) {
			return null;
			}

			// return null if another validator has already found an error on the matchingControl
			if (matchingControl.errors && !matchingControl.errors.mustMatch) {
				return null;
			}

			// set error on matchingControl if validation fails
			if (control.value !== matchingControl.value) {
				matchingControl.setErrors({ mustMatch: true });
			} else {
				matchingControl.setErrors(null);
			}
		}
	}

}

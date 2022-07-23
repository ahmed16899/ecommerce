import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _auth:AuthService , private router: Router , private _user:UserService) { }
  eror!:String
  registerForm:FormGroup=new FormGroup({
    /*first_name: new FormControl(null,[Validators.required]),
    last_name: new FormControl(null,[Validators.required]),*/
    email: new FormControl(null,[Validators.required , Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
    password: new FormControl(null,[Validators.required]),
    address: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required]),

   // age: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
  })
  ngOnInit(): void {
  }
  submitForm(formData:FormGroup)
  {
    console.log(formData.value.email , formData.value.password)
    this._auth.signup(formData.value.email,formData.value.password).then(data =>{
      console.log( 'success',data)
      this._user.addNewUser(data.user?.uid,formData.value.email , 'user',formData.value.address,formData.value.phone).then(()=>{
          this.router.navigateByUrl('signin');
      })
    })
    .catch(err =>{this.eror=err.message; console.log(err.message)})
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Service/auth.service';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit ,OnDestroy{

  constructor(private _auth:AuthService , private router: Router ,private _user :UserService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  eror!:String
  token!:String

  id!:any
  user!:any
  check:boolean=false;
  subs = new Subscription();

  registerForm:FormGroup=new FormGroup({
    /*first_name: new FormControl(null,[Validators.required]),
    last_name: new FormControl(null,[Validators.required]),*/
    email: new FormControl(null,[Validators.required , Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
    password: new FormControl(null,[Validators.required]),
   // age: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
  })
  ngOnInit(): void {
          //localStorage.clear()
  }
  submitForm(formData:FormGroup)
  {
    //console.log(formData.value.email , formData.value.password)
    this._auth.signin(formData.value.email,formData.value.password).then(data =>{
      this.id=data.user?.uid
      localStorage.setItem('id',this.id)
      console.log( data.user);
      //localStorage.setItem('user',JSON.stringify(data.user))

      console.log( 'success',data , data.user?.uid);
      //console.log( 'success',data , data.user?.getIdToken().then);
      /*data.user?.getIdToken().then((data)=>{
        this.token=data
        localStorage.setItem('token',data)
        this._auth.setUserData();
        console.log(data)
      })*/

      this.subs=this._auth.getUserType(this.id).subscribe((res)=>{
        this.user=res
        console.log(this.user)
       // console.log(this.user)
        localStorage.setItem('data',JSON.stringify(this.user))
        this._auth.setUserData()
        console.log(this._auth.userDataG.getValue())
        if(this.user.type == 'user')
        {
          this._user.user= this.user
          this._auth.userDataG.next('login');
         // if(this.check == false)
         // {
          
            this._auth.type='user'
            this._auth._type.next('user');
            this.router.navigateByUrl('user/home');
          //  this.check = true
         // }
        }
        else if(this.user.type == 'admin')
        {
          this._auth.userDataG.next('login');
          this._auth.type='admin';
          this._auth._type.next('admin');

          //if(this.check == false)
          //{
            this.router.navigateByUrl('admin/add');
          //  this.check = true
         // }
        }
      })
    })
    .catch(err =>{this.eror=err.message; console.log(err.message)})
  }
}

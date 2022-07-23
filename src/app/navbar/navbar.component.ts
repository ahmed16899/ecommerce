import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogIn:boolean=false;
  type!:string;
  cartLength:number=0

  constructor(private _auth:AuthService,private _Router:Router , private _user:UserService) { }

  ngOnInit(): void {
    //this.cartLength = this._user.cart.length;
    ///this.type=this.
    //console.log(this._auth.userData)
    //this._auth.userData.subscribe((user)=>{
        //console.log(user)
        this._user.cartLength.subscribe((data)=>{
            this.cartLength = this._user.cartLength.getValue(); 
        })
       
        this._auth.userDataaaa.subscribe((data)=>{
           
          if(this._auth.userDataaaa.getValue().includes('user'))
          {
              this.type='user';
          }
          else
          {
            this.type='admin';
          }
        })
        console.log(this._auth.userDataG.getValue())
        this._auth.userDataaaa.subscribe(()=>{
          if(this._auth.userDataaaa.getValue() != 'null')
          {
            this.isLogIn=true
            //this.isLogIn =  this._auth.isLogIn
            //this._auth.userDataG.next('log')
          }
          else
          {
            this.isLogIn=false
            //this.isLogIn =  this._auth.isLogIn
          }
        })
       
    }//)
    /*if(this._auth.userDataG.getValue()=='null')
    {
      this.isLogIn=false
    }
    else
    {
      this.isLogIn=true

    }*/
  
  signOut()
  {
    this._auth.signout();
    this._auth.userDataG.next('null');
    this._Router.navigate(['signin'])
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogregGuard implements CanActivate {
  constructor(private _auth:AuthService,private _Router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
     /*if(this._auth.isLogIn == true)
     {
      return true;

     }
     else
     {
      this._Router.navigate(['user/home'])
      return false;
     }*/
     if(this._auth.userDataG.getValue() =='null')
     {
      return true;
     }
     else
     {
      this._Router.navigate(['user/home'])
      return false;
     }
  }
  
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(private _auth:AuthService,private _Router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._auth.userDataaaa.getValue().includes('admin'))
      {
       return true;
      }
      else
      {
       this._Router.navigate(['signin'])
       return false;
      }  }
  
}

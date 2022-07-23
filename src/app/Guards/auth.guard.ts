import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth:AuthService,private _Router:Router){}
  user!:any
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     /*return new Promise(resolve =>
      {
        this._auth.userData.subscribe(()=>{
          if(this.user)
       {
         resolve(true);
       }
       else
       {
         this._Router.navigate(['signin'])
         resolve(false);
       }
        })
      })*/

     if(this._auth.userDataaaa.getValue().includes('user'))
     {
      return true;
     }
     else
     {
      this._Router.navigate(['signin'])
      return false;
     }
      /*this._auth.userData.subscribe((user)=>{
       this.user=user
       console.log('from gaaaaaaard',this.user)
       if(this.user)
       {
         console.log('from gaaaaaaard',this.user)
         return true;
       }
       else
       {
         this._Router.navigate(['signin'])
         console.log('noooooooo gaaaaaaard',this.user)
 
         return false;
       }
      
      })
  return false;*/
     
  }

}

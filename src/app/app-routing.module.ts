import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { LogregGuard } from './Guards/logreg.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { AdminguardGuard } from './Guards/adminguard.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['user/home']);


const routes: Routes = [
  {path:'test',component:TestComponent,canActivate: [/*AngularFireAuthGuard*/LogregGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'signin',component:SigninComponent,canActivate: [LogregGuard] },
  {path:'signup',component:SignupComponent,canActivate: [LogregGuard]},
  {path:'user'
  ,loadChildren:()=>import('./User/user/user.module').then(x => x.UserModule)
  ,canActivate:[/*AngularFireAuthGuard*/AuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'admin'
  ,loadChildren:()=>import('./Admin/admin/admin.module').then(x => x.AdminModule)
  ,canActivate:[/*AngularFireAuthGuard*/AdminguardGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

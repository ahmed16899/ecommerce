import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData!: Observable<firebase.default.User | null>
  userDataG = new BehaviorSubject('null'); 
  userDataaaa = new BehaviorSubject('null');
  _type = new BehaviorSubject('null');
  type !:String

  constructor(private _AFA : AngularFireAuth , private _fireStore:AngularFirestore) {
    /*this.userData=_AFA.user
    this.userData.subscribe((data)=>{
      console.log(data)
    })*/
    //console.log('from service',this.userData)
    if(localStorage.getItem('data'))
      {
        this.setUserData();
      }
   }
  signup(mail:string,password:string)
  {
      return this._AFA.createUserWithEmailAndPassword(mail,password);
  }
  signin(mail:string,password:string)
  {
      return this._AFA.signInWithEmailAndPassword(mail,password);
  }
  getUserType(userID:string)
  {
      return this._fireStore.collection('users').doc(userID).valueChanges()
  }
  signout()
  {
   // this.userDataG.next('null');
   localStorage.removeItem('data') 
    this.userDataG.next("null");
    this.userDataaaa.next("null");
    return this._AFA.signOut()
  }
  setUserData()
  {
    //const token = ;
    const userData:any = JSON.stringify(localStorage.getItem('data'));
    this.userDataaaa.next(userData);
    console.log( this.userDataaaa.getValue().includes('user'))
    return userData ;
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any
  cartLength = new BehaviorSubject(0);

  constructor(private _fireStore:AngularFirestore) { }
  addNewUser(id:any , mail:string ,  type:string ,  address:string , phone:string)
  {
    return this._fireStore.doc(`users/${id}`).set({
      mail,
      type,address,phone
    })
  }
  addCart(userID:any, mail:string ,  totalPrice:number ,  cartItems:any[])
  {
    this._fireStore.collection('cart').add({
      userID,mail,totalPrice,cartItems
    })
    .then((data) => {
      console.log(data)
    }).catch((err)=>
    {
      console.log(err)
    })
    
     
  }
  getAllProducts()
  {
    return this._fireStore.collection('products').snapshotChanges()
  }
 
}

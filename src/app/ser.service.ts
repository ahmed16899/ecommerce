import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerService {

  constructor(private _fireStore:AngularFirestore) { }
  getAllProducts()
  {
    return this._fireStore.collection('products').snapshotChanges()
  }
  
}

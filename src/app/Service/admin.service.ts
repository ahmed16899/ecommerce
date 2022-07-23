import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //addDone:boolean=false
  addDone = new BehaviorSubject(false);

  constructor(private _fireStore:AngularFirestore , private _fireStorage:AngularFireStorage ) { }
  addNewProduct(name:any , price:string ,description:string ,discount:string,category:string,  image:File)
  {
      const ref = this._fireStorage.ref(`products/${image.name}`)
      ref.put(image).then(()=>{
        ref.getDownloadURL().subscribe((photoURL)=>{
          this._fireStore.collection('products').add({
           name,price,description,discount,category,photoURL
          }).then((data) => {
            console.log(data.id)
            if(data.id)
            {
              this.addDone.next(true);
              console.log(  this.addDone.getValue())
            }
          })
        })
      })   
  }
  getAllProducts()
  {
    return this._fireStore.collection('products').snapshotChanges()
  }
  deleteProducts(productId:string)
  {
    return this._fireStore.collection('products').doc(productId).delete();
  }
  updateProduct(id:any , name:any , price:string ,description:string ,discount:string,category:string,  photoURL:string)
  {
    return this._fireStore.collection('products').doc(id).update(
       
      {name:name , price:price , description:description , discount:discount ,category:category , photoURL:photoURL}
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _fireStore:AngularFirestore , private _admin:AdminService) { }
  products:any[]=[]
  id!:any
  searcItem:string=''
  updateForm:FormGroup=new FormGroup({
    product: new FormControl(null,[Validators.required /*, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)*/]),
    price: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    discount: new FormControl(null,[Validators.required]),
    category: new FormControl('Category',[Validators.required]),
    file: new FormControl(null,[Validators.required]),
  })
  ngOnInit(): void {
    this._admin.getAllProducts().subscribe((response)=>{
      this.products = response.map(e => {
         return {id:e.payload.doc.id , ...e.payload.doc.data() as any}
      })
      console.log(this.products)
    });
  }
  deleteProduct(product:any)
  {
    console.log(product)
    if(confirm(`Are toy sure to delete ${product.name}`))
    this._admin.deleteProducts(product.id).then((response)=>{
      console.log(response)
    })
  }
  openModal(product:any)
  {
    this.id=product
    console.log(product)
    this.updateForm = new FormGroup ({
      product: new FormControl(product.name,[Validators.required /*, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)*/]),
      price: new FormControl(product.price,[Validators.required]),
      description: new FormControl(product.description,[Validators.required]),
      discount: new FormControl(product.discount,[Validators.required]),
      category: new FormControl(product.category,[Validators.required]),
      // file: new FormControl(product.photoURL,[Validators.required])
    })
  }
  updateProduct(updatedProduct:any)
  {
    console.log(this.id.id)
    console.log(updatedProduct.value)
    this._admin.updateProduct(this.id.id,
      updatedProduct.value.product,
      updatedProduct.value.price,
      updatedProduct.value.description,
      updatedProduct.value.discount,
      updatedProduct.value.category,
      this.id.photoURL).then((data)=>{
        console.log(data)
    })
  }

}

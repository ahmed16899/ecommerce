import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  addDone:boolean=false
  constructor(private _admin:AdminService) { }
  @ViewChild('image')image!: ElementRef;
  registerForm:FormGroup=new FormGroup({
    product: new FormControl(null,[Validators.required /*, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)*/]),
    price: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    discount: new FormControl(null,[Validators.required]),
    category: new FormControl('Category',[Validators.required]),
    file: new FormControl(null,[Validators.required]),
  })
  ngOnInit(): void {
  }
  addnewProduct(formData:FormGroup)
  {
    //console.log(formData.value.product,formData.value.price)
    console.log(formData.value )

    console.log(this.image.nativeElement.files[0])
   this._admin.addNewProduct(formData.value.product,
    formData.value.price,
    formData.value.description,
    formData.value.discount,
    formData.value.category,
    this.image.nativeElement.files[0])
    this._admin.addDone.subscribe(()=>{
      this.addDone=this._admin.addDone.getValue();
    })
    formData.reset();
  }

}

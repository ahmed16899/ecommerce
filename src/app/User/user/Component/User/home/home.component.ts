import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any[] = []
  cart: any[] = []
  ids: any[] = []
  user:any
  total: number = 0
  constructor(private _fireStore: AngularFirestore, private _user: UserService) { }
  ngOnInit(): void {
    //this._user.cart=this.cart
    //console.log( this._user.cart)
    this.user = JSON.parse(localStorage.getItem('data')||'{}')
    console.log(this.user)
    this._user.getAllProducts().subscribe((response) => {
      this.products = response.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() as any }
      })
      console.log(this.products)
    });
  }
  addToCart(product: any) {
    
    //console.log(product)
    if (this.ids.length == 0) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        totalPrice: product.price
      }
      this.cart.push(cartItem)
      this.ids.push(product.id)
      this.calcTotal() 
      console.log(this.cart)
      this._user.cartLength.next(this.cart.length)
    }
    else {
      const check = false;
      //for (let i = 0; i < this.ids.length; i++) {
        console.log(this.ids.length)
        if (!this.ids.includes(product.id)) {

          console.log(true)
          console.log(product.id)
          //console.log(this.cart[i].id)
          console.log(this.cart)
          const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            totalPrice: product.price
          }

          console.log(this.cart)
          this.cart.push(cartItem)
          this.ids.push(product.id)
          this.calcTotal()
          this._user.cartLength.next(this.cart.length)


          //break;
          //this.calcTotal() 
          //break;
        }
        /*else {
          this.cart[i].quantity++
        }*/
        //break;
     // }
      /* for(let i = 0 ; i<this.cart.length ; i++)
     {
       if(product.id != this.cart[i].id)
       {
        
         console.log(true)
         console.log(product.id )
         console.log(this.cart[i].id)
         console.log(this.cart)
         const cartItem={
           id:product.id,
           name:product.name,
           price:product.price,
           quantity:1,
           totalPrice:product.price
         }
 
         console.log(this.cart)
         this.cart.push(cartItem)
         break;
         //this.calcTotal() 
           //break;
       }
      else
       {
         this.cart[i].quantity++
       }
       //break;
     }*/
    }
    //console.log( this._user.cart)
  }
  addOne(cartItem: any ) {
    cartItem.quantity++;
    let totalPrice = Number(cartItem.price) * Number(cartItem.quantity);
    cartItem.totalPrice = totalPrice;
     this.calcTotal();
     this._user.cartLength.next(this.cart.length);

  }
  deleteOne(cartItem: any , cartIndex: number) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      let totalPrice = Number(cartItem.price) * Number(cartItem.quantity);
      cartItem.totalPrice = totalPrice;
    }
    else if (cartItem.quantity == 1 )
    {
      this.cart.splice(cartIndex, 1);
      this.ids.splice(cartIndex, 1);
      this._user.cartLength.next(this.cart.length);
    }
     this.calcTotal()
  }
  deleteAll(cartIndex: any) {
    this.cart.splice(cartIndex, 1)
    this.ids.splice(cartIndex, 1);
    this.calcTotal()
    this._user.cartLength.next(this.cart.length);
  }
  calcTotal() {
    this.total=0
    for (let i = 0; i < this.cart.length; i++) {
      this.total += Number(this.cart[i].totalPrice)
    }
  }
  confirmBuying()
  {
    console.log(this.cart)
    console.log(this.user)
    console.log(this.total)
    const id = localStorage.getItem('id')
    //this._user.addCart(id,this.user.mail,this.total,this.cart);
    //console.log( this._user.cart.length)
  }
}

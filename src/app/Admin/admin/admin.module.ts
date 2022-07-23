import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddproductComponent } from './Component/admin/addproduct/addproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './Component/admin/admin/products/products.component';
import { RequestsComponent } from './Component/admin/admin/requests/requests.component';
import { SearchPipe } from 'src/app/Pipes/search.pipe';


@NgModule({
  declarations: [
    AddproductComponent,
    ProductsComponent,
    RequestsComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

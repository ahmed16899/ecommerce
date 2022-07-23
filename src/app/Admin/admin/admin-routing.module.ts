import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './Component/admin/addproduct/addproduct.component';
import { ProductsComponent } from './Component/admin/admin/products/products.component';
import { RequestsComponent } from './Component/admin/admin/requests/requests.component';

const routes: Routes = [
  {path:'add',component:AddproductComponent},
  {path:'products',component:ProductsComponent},
  {path:'requests',component:RequestsComponent},
  {path:'',component:AddproductComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

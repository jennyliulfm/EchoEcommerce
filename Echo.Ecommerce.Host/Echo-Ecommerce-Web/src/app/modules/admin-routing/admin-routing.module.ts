import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../../../app/components/admin/product/product.component';
import { CategoryComponent } from '../../../app/components/admin/category/category.component';

const adminRoutes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

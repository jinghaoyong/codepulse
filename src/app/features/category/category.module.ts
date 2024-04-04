import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CategoryListRoutingModule } from './category.routing';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryListComponent } from './category-list/category-list.component';



@NgModule({
  declarations: [AddCategoryComponent,EditCategoryComponent, CategoryListComponent],
  imports: [
    CategoryListRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryListModule { }

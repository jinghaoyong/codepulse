import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { BlogpostListComponent } from './blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './blog-post/add-blogpost/add-blogpost.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RouterModule } from '@angular/router';
import { FeaturesRoutingModule } from './features.routing';



@NgModule({
  declarations: [
  ],
  imports: [
    FeaturesRoutingModule,
    RouterModule,
    CommonModule
  ]
})
export class FeaturesModule { }

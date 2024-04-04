import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { HomeComponent } from './home/home.component';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [BlogDetailsComponent,HomeComponent],
  imports: [
    PublicRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot()
  ]
})
export class PublicModule { }

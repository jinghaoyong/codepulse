import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogpostComponent } from './add-blogpost/add-blogpost.component';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { EditBlogpostComponent } from './edit-blogpost/edit-blogpost.component';
import { BlogPostRoutingModule } from './blog-post.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from "../../shared/components/component.module";
import { MarkdownModule } from 'ngx-markdown';
import { MyBlogpostsComponent } from './my-blogposts/my-blogposts.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
    declarations: [AddBlogpostComponent, BlogpostListComponent, EditBlogpostComponent, MyBlogpostsComponent],
    imports: [
        BlogPostRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentModule,
        MarkdownModule,
        NgxEditorModule
    ]
})
export class BlogPostModule { }

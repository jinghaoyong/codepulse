import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit, OnDestroy {

  blogPost$?: Observable<BlogPost[]>;

  deleteBlogPostSubscription?: Subscription;

  constructor(
    private blogPostServ: BlogPostService
  ) {

  }


  onDelete(id: string) {
    if (id) {
      this.deleteBlogPostSubscription = this.blogPostServ.deleteBlogPost(id).subscribe({
        next: (response) => {
          this.blogPost$ = this.blogPostServ.getAllBlogPosts();
        }
      })
    }
  }

  ngOnInit(): void {
    // get all blogpost from api
    this.blogPost$ = this.blogPostServ.getAllBlogPosts();
  }


  ngOnDestroy(): void {
    this.deleteBlogPostSubscription?.unsubscribe();
  }


}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit, OnDestroy {

  blogPost$?: Observable<BlogPost[]>;

  blogsFromFirebase?: any
  deleteBlogPostSubscription?: Subscription;

  constructor(
    private blogPostServ: BlogPostService,
    private spinServ : SpinnerService
  ) {

  }


  onDelete(id: string) {
    console.log("id", id)
    // if (id) {
    //   this.deleteBlogPostSubscription = this.blogPostServ.deleteBlogPost(id).subscribe({
    //     next: (response) => {
    //       this.blogPost$ = this.blogPostServ.getAllBlogPosts();
    //     }
    //   })
    // }
    if (id) {
      this.spinServ.requestStarted();
      this.blogPostServ.deletePostFromFirebase(id)
        .then(() => {
          console.log("Post deleted successfully!");
          this.blogPostServ.getAllBlogPostsFromFirebase().then((data) => {
            this.blogsFromFirebase = data;
            this.spinServ.requestEnded();
          })
            .catch((error) => {
              this.spinServ.requestEnded();
            });
        })
        .catch((error) => {
          console.error("Error deleting post: ", error);
          this.spinServ.requestEnded();
        });
    }

  }

  ngOnInit(): void {
    // get all blogpost from api
    // this.blogPost$ = this.blogPostServ.getAllBlogPosts();
    this.blogPostServ.getAllBlogPostsFromFirebase().then((data) => {
      this.blogsFromFirebase = data;
      this.spinServ.requestEnded();
    })
      .catch((error) => {
        this.spinServ.requestEnded();
      });
  }


  ngOnDestroy(): void {
    this.deleteBlogPostSubscription?.unsubscribe();
  }


}

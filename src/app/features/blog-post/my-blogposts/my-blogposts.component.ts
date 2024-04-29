import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-blogposts',
  templateUrl: './my-blogposts.component.html',
  styleUrls: ['./my-blogposts.component.scss']
})
export class MyBlogpostsComponent implements OnInit {
  user?: User;
  getBlogPostsSubscription?: Subscription;
  blogPosts: any;

  constructor(
    private blogPostServ: BlogPostService,
    private authServ: AuthService
  ) {
    this.user = this.authServ.getUser();
  }
  ngOnInit(): void {
    if (this.user?.uid) {
      this.getBlogPostsSubscription = this.blogPostServ.getPostsByCreatorIdFromFirebase(this.user?.uid)
        .subscribe({
          next: (data: any) => {
            console.log("data", data)
          }
        })
    }

  }

}

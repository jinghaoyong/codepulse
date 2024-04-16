import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPost[]>;
  blogsFromFirebase?: any;
  constructor(
    private blogPostServ: BlogPostService,
    private spinServ: SpinnerService
  ) {

  }
  ngOnInit(): void {
    this.spinServ.requestStarted();

    // this.blogs$ = this.blogPostServ.getAllBlogPosts()
   
    this.blogPostServ.getAllBlogPostsFromFirebase().then((data) => {
      this.blogsFromFirebase = data;
      this.spinServ.requestEnded();
    })
      .catch((error) => {
        this.spinServ.requestEnded();
      });

    console.log("this.blogsFromFirebase", this.blogsFromFirebase)
  }

  uploadImage(event: any, id: any) {
    this.blogPostServ.uploadImageToFireStore(event, id)
  }

}

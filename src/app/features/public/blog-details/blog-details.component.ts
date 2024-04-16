import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  id: string | null = null;
  blogPost?: any;
  constructor(
    private route: ActivatedRoute,
    private blogPostServ: BlogPostService
  ) {

  }

  ngOnInit(): void {
    console.log("got come in")
    this.route.paramMap
      .subscribe({
        next: (params) => {
          this.id = params.get('id');
          console.log(`this.id = params.get('id');`,this.id)
        }
      })

    //fetch blog details by url
    if (this.id) {
      this.blogPostServ.getPostByIdFromFirebase(this.id).then((postData) => {
        if (postData) {
          console.log("Post data:", postData);
          this.blogPost = postData
          // this.selectedCategories = postData.categories.map(x => x.id);
        } else {
          console.log("Post not found!");
        }
      })
        .catch((error) => {
          console.error("Error retrieving post: ", error);
        });
    }



  }

}

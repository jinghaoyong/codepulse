import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogPost;

  constructor(
    private blogpostServ: BlogPostService,
    private router: Router
  ) {
    this.model = {
      title: "",
      shortDescription: "",
      urlHandle: "",
      content: "",
      featuredImageUrl: "",
      author: "",
      isVisible: true,
      publishedDate: new Date()
    }
  }

  onFormSubmit(): void {
    this.blogpostServ.createBlogPost(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  constructor(
    private blogpostServ: BlogPostService,
    private router: Router,
    private categorySer: CategoryService
  ) {
    this.model = {
      title: "",
      shortDescription: "",
      urlHandle: "",
      content: "",
      featuredImageUrl: "",
      author: "",
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categorySer.getAllCategories();
  }

  onFormSubmit(): void {
    console.log(this.model)
    this.blogpostServ.createBlogPost(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }

}
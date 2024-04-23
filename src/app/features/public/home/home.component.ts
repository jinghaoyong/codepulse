import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { CategoryService } from '../../category/services/category.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPost[]>;
  blogsFromFirebase?: any;
  categories?: any;

  selectedCategoryId?: string;
  selectedCategoryName?: string;
  selectedCategoryDescription?: string;
  selectedCategoryImage?: string;

  user?: User;
  constructor(
    private blogPostServ: BlogPostService,
    private spinServ: SpinnerService,
    private categoryServ: CategoryService,
    private authServ: AuthService
  ) {

  }
  ngOnInit(): void {
    this.spinServ.requestStarted();
    this.user = this.authServ.getUser();
    // this.blogs$ = this.blogPostServ.getAllBlogPosts()

    this.categoryServ.getAllCategoriesFromFirebase().then((data: any) => {
      console.log("data", data)
      this.categories = data;
    });

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

  selectCategory(id: any) {

    this.categoryServ.getCategoryByIdFromFirebase(id).subscribe((category: any) => {
      category; // Assign the retrieved category to the component variable
      console.log("category", category); // Use the category object retrieved from Firebase
      this.selectedCategoryId = category?.id;
      this.selectedCategoryName = category?.categoryName;
      this.selectedCategoryDescription = category?.categoryDescription;
      this.selectedCategoryImage = category?.categoryImage;
      // Now you can access this.category.id and this.category.data to get the id and data
      this.blogPostServ.getPostsByCategoryIdFromFirebase(id).then((data) => {
        this.blogsFromFirebase = data;
        this.spinServ.requestEnded();
      })
        .catch((error) => {
          this.spinServ.requestEnded();
        });
    });
  }

}

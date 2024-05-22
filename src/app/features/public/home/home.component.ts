import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { CategoryService } from '../../category/services/category.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPost[]>;
  top3blogsFromFirebase?: any
  blogsFromFirebase?: any;
  categories?: any;
  activeCategory: string = '';  // Default active category

  displayedPosts: any[] = [];
  postsToShow: number = 6;

  displayedMostViewsPosts: any[] = [];
  mostViewspostsToShow: number = 3;

  user?: User;

  //send email
  emailData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(
    private blogPostServ: BlogPostService,
    private spinServ: SpinnerService,
    private categoryServ: CategoryService,
    private authServ: AuthService,
    private toastServ: ToastService
  ) {

  }
  ngOnInit(): void {
    this.spinServ.requestStarted();
    this.user = this.authServ.getUser();

    // this.blogs$ = this.blogPostServ.getAllBlogPosts()

    this.blogPostServ.getTop3BlogPostsFromFirebase().subscribe({
      next: (data: any) => {
        this.spinServ.requestStarted();
        console.log("this.blogPostServ.getTop3BlogPostsFromFirebase data > ", data)
        this.top3blogsFromFirebase = data;
        this.displayMostViewsPosts(data);
        this.spinServ.requestEnded();
      }
    })

    this.categoryServ.getAllCategoriesFromFirebase().subscribe({
      next: (res) => {

        this.categories = res;

        if (this.categories.length > 0) {
          this.activeCategory = this.categories[0].id;
          console.log("this.categories[0].id", this.categories[0].id)
          this.blogPostServ.getPostsByCategoryIdFromFirebase(this.categories[0].id).subscribe({
            next: (data: any) => {

              console.log("    this.blogsFromFirebase = data;',", data)
              this.blogsFromFirebase = data;
              this.displayPosts(data);
              this.spinServ.requestEnded();

            }
          })

        } else {
          this.spinServ.requestEnded();
          this.toastServ.showToast('error', `Error when loading categories!`, '', true);
        }

      }
    })
  }

  displayPosts(blogsFromFirebase: any) {
    this.displayedPosts = blogsFromFirebase.slice(0, this.postsToShow);
  }

  showMore() {
    this.postsToShow += 6; // Increase the number of posts to show by 6
    this.displayPosts(this.blogsFromFirebase);
  }

  uploadImage(event: any, id: any) {
    this.blogPostServ.uploadImageToFireStore(event, id)
  }

  displayMostViewsPosts(blogsFromFirebase: any) {
    this.displayedMostViewsPosts = blogsFromFirebase.slice(0, this.mostViewspostsToShow);
  }

  showMoreMostViews() {
    this.mostViewspostsToShow += 3; // Increase the number of posts to show by 6
    this.displayMostViewsPosts(this.top3blogsFromFirebase);
  }


  setActiveCategory(categoryId: string) {
    console.log("selected categoryId", categoryId)
    this.activeCategory = categoryId;

    this.blogPostServ.getPostsByCategoryIdFromFirebase(categoryId).subscribe({
      next: (data: any) => {

        console.log("    this.blogsFromFirebase = data;',", data)
        this.blogsFromFirebase = data;
        this.displayPosts(data);
        this.spinServ.requestEnded();

      }
    })

  }

  sendEmail() {
    const mailtoLink = `mailto:jinghao0958@gmail.com?subject=${encodeURIComponent(this.emailData.subject)}&body=${encodeURIComponent('Name: ' + this.emailData.name + '\n\nMessage: ' + this.emailData.message)}`;
    window.location.href = mailtoLink;
  }

}

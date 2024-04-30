import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {

  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;

  imageSelectorSubscription?: Subscription;

  user?: User;

  categories?: any

  imageFileEventData?: any;
  imageFileUrl?: any;
  constructor(
    private blogpostServ: BlogPostService,
    private router: Router,
    private categoryServ: CategoryService,
    private imageServ: ImageService,
    private authServ: AuthService,
    private spinServ: SpinnerService,
    private location: Location
  ) {
    this.model = {
      title: "",
      desc: "",
      imageUrl: "",
      content: "",
      isVisible: true,
      publishedDate: new Date(),
      lastEditedDate: new Date(),
      categoryId: '',
      createdBy: '',
      createdById: ''
    }
  }


  ngOnInit(): void {
    this.user = this.authServ.getUser();
    this.categoryServ.getAllCategoriesFromFirebase().then((data: any) => {
      console.log("data", data)
      this.categories = data;
    });
    // this.categories$ = this.categorySer.getAllCategories();

    // this.imageSelectorSubscription = this.imageServ.onSelectImage()
    //   .subscribe({
    //     next: (selectedImage) => {
    //       this.model.featuredImageUrl = selectedImage.url;
    //       this.closeImageSelector();
    //     }
    //   })
  }

  onFormSubmit(): void {
    if (this.user) {
      this.spinServ.requestStarted();
      this.model.createdBy = this.user?.name;
      this.model.createdById = this.user?.uid;
      console.log("this.model", this.model)

      this.blogpostServ.createPostToFirebase(this.model, this.imageFileEventData).then(() => {
        this.spinServ.requestEnded();
        // this.router.navigate(['/']);
        this.location.back();

      }).catch((error) => {
        this.spinServ.requestEnded();
        console.error("Error retrieving post: ", error);
      });
    }

    // this.blogpostServ.createBlogPost(this.model).subscribe({
    //   next: (res) => {
    //     this.router.navigateByUrl('/admin/blogposts');
    //   }
    // })
    // this.blogpostServ.createPostToFirebase(this.model)
  }

  uploadImage(event: any) {
    this.imageFileEventData = event;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageFileUrl = reader.result;
      };
    }
  }


  // openImageSelector(): void {
  //   this.isImageSelectorVisible = true;
  // }
  // closeImageSelector(): void {
  //   this.isImageSelectorVisible = false;
  // }

  onBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }

}

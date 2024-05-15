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
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { markValidateAllField } from 'src/app/shared/services/utilities';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {

  model: any;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;

  imageSelectorSubscription?: Subscription;

  user?: User;

  categories?: any

  imageFileEventData?: any;
  imageFileUrl?: any;
  isAnyFieldEmpty: boolean = false; // Add this property

  emptyFields?: any;

  addBlogPostForm!: UntypedFormGroup;

  constructor(
    private blogpostServ: BlogPostService,
    private router: Router,
    private categoryServ: CategoryService,
    private imageServ: ImageService,
    private authServ: AuthService,
    private spinServ: SpinnerService,
    private location: Location,
    private toastServ: ToastService,
    private fb: FormBuilder
  ) {

    this.addBlogPostForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      imageUrl: [''],
      content: ['', Validators.required],
      isVisible: true,
      publishedDate: [new Date().toISOString().slice(0, 10), Validators.required],
      lastEditedDate: [new Date().toISOString().slice(0, 10), Validators.required],
      categoryId: ['', Validators.required],
      createdBy: ['', Validators.required],
      createdById: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.user = this.authServ.getUser();
    this.categoryServ.getAllCategoriesFromFirebase().subscribe({
      next: (res) => {
        this.categories = res;

        console.log("this.categories", this.categories)
      }
    })
    // this.categories$ = this.categorySer.getAllCategories();

    // this.imageSelectorSubscription = this.imageServ.onSelectImage()
    //   .subscribe({
    //     next: (selectedImage) => {
    //       this.model.featuredImageUrl = selectedImage.url;
    //       this.closeImageSelector();
    //     }
    //   })
  }

  // // Function to check if any field is empty
  // checkEmptyFields() {
  //   const fieldsToCheck = Object.keys(this.model).filter(key => key !== 'imageUrl');

  //   const emptyFields = fieldsToCheck
  //     .filter((key) => !this.model[key])
  //     .map(key => key);

  //   if (emptyFields.length > 0) {
  //     console.log("Empty fields:", emptyFields.join(", "));
  //     this.emptyFields = emptyFields.join(", ");
  //     this.isAnyFieldEmpty = true;
  //   } else {
  //     this.isAnyFieldEmpty = false;
  //   }
  // }



  onFormSubmit(): void {
    if (this.user) {
      this.spinServ.requestStarted();
      this.addBlogPostForm.get('createdBy')?.patchValue(this.user?.name);
      this.addBlogPostForm.get('createdById')?.patchValue(this.user?.uid);
      console.log("this.addBlogPostForm", this.addBlogPostForm.getRawValue())

      if (this.addBlogPostForm.invalid) {
        this.toastServ.showToast('error', `Please fill in all the details`, '', true);
        markValidateAllField(this.addBlogPostForm);
        this.spinServ.requestEnded();
        return;
      }

      this.blogpostServ.createPostToFirebase(this.addBlogPostForm.getRawValue(), this.imageFileEventData).then(() => {
        this.toastServ.showToast('success', `Successfully Posted !`, '', true);
        this.spinServ.requestEnded();
        // this.router.navigate(['/']);
        this.location.back();

      }).catch((error) => {
        this.spinServ.requestEnded();
        this.toastServ.showToast('error', `Fail to Post !`, '', true);
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

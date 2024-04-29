import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  deleteCategorySubscription?: Subscription;
  category?: any;


  //firebase
  imageFileEventData?: any;
  imageFileUrl?: any;

  constructor(
    private route: ActivatedRoute,
    private categoryServ: CategoryService,
    private router: Router,
    private toastServ: ToastService,
    private blogPostServ: BlogPostService,
    private spinServ: SpinnerService,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.categoryServ.getCategoryByIdFromFirebase(this.id).subscribe({
            next: (res) => {
              this.category = res;
            }
          })
        }
      }
    })
  }

  onFormSubmit(): void {
    //convert this model to request object
    if (this.category && this.id) {
      console.log(`(this.category && this.id)`, this.category && this.id)
      if (this.imageFileEventData) {
        // got image changed 
        this.blogPostServ.deleteImageFromFirebase(this.category.categoryImage);
        this.blogPostServ.uploadImageToFireStore(this.imageFileEventData, this.id).then((imageUrl) => {
          this.spinServ.requestStarted();
          if (this.category) {
            var updateCategoryPost: any = {
              categoryDescription: this.category.categoryDescription,
              categoryImage: imageUrl,
              categoryName: this.category.categoryName
            };
            console.log("this.id", this.id)
            this.categoryServ.updateCategoryToFirebase(this.id, updateCategoryPost).then(() => {

              // this.router.navigateByUrl('/blogposts');
              this.location.back();
              this.spinServ.requestEnded();

            })
              .catch((error) => {
                this.spinServ.requestEnded();
                console.error("Error retrieving category: ", error);
              });
          }

        });
      } else {
        // no image change
        if (this.category) {
          var updateCategoryPost: any = {
            categoryDescription: this.category.categoryDescription,
            categoryImage: this.category.categoryImage,
            categoryName: this.category.categoryName
          };
          console.log("this.id", this.id)
          this.blogPostServ.updatePostToFirebase(this.id, updateCategoryPost).then(() => {

            // this.router.navigateByUrl('/blogposts');
            this.location.back();
            this.spinServ.requestEnded();

          })
            .catch((error) => {
              this.spinServ.requestEnded();
              console.error("Error retrieving category: ", error);
            });
        }
      }

      // postData.imageUrl = imageUrl;
      // console.log("postData.url", postData.url)
      // await this.updatePostToFirebase(postId, postData);
    }
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

  onDelete(): void {
    if (this.id) {
      this.categoryServ.deletePostFromFirebase(this.id).then(() => {
        this.toastServ.showToast('error', "Deleted !!", 'top-left', true)
        this.location.back();
      }).catch((error) => {
        this.spinServ.requestEnded();
        console.error("Error when delete category: ", error);
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }

}

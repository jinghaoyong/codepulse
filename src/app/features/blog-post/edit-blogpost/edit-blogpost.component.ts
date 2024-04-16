import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;

  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;

  //firebase
  imageFileEventData?: any;
  imageFileUrl?: any;

  constructor(
    private route: ActivatedRoute,
    private blogPostServ: BlogPostService,
    private categoryServ: CategoryService,
    private router: Router,
    private imageServ: ImageService,
    private spinServ: SpinnerService
  ) {

  }
  ngOnInit(): void {
    this.categories$ = this.categoryServ.getAllCategories();

    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.blogPostServ.getPostByIdFromFirebase(this.id).then((postData) => {
            if (postData) {
              console.log("Post data:", postData);
              this.model = postData
              // this.selectedCategories = postData.categories.map(x => x.id);
            } else {
              console.log("Post not found!");
            }
          })
            .catch((error) => {
              console.error("Error retrieving post: ", error);
            });
        }



        this.imageSelectSubscription = this.imageServ.onSelectImage()
          .subscribe({
            next: (response) => {
              if (this.model) {
                this.model.imageUrl = response.url;
                this.isImageSelectorVisible = false;
              }
            }
          })

      }
    })
  }

  onFormSubmit() {

    //convert this model to request object
    if (this.model && this.id) {
      this.blogPostServ.uploadImageToFireStore(this.imageFileEventData, this.id).then((imageUrl) => {
        this.spinServ.requestStarted();
        if (this.model) {
          var updateBlogPost: UpdateBlogPost = {
            content: this.model.content,
            desc: this.model.desc,
            imageUrl: imageUrl,
            isVisible: this.model.isVisible,
            publishedDate: this.model.publishedDate,
            title: this.model.title,
            categories: this.selectedCategories ?? [],
            lastEditedDate: new Date(),
            createdBy: this.model.createdBy,
            createdById: this.model.createdById
          };
          console.log("this.id", this.id)
          this.blogPostServ.updatePostToFirebase(this.id, updateBlogPost).then(() => {

            this.router.navigateByUrl('/admin/blogposts');
            this.spinServ.requestEnded();

          })
            .catch((error) => {
              this.spinServ.requestEnded();
              console.error("Error retrieving post: ", error);
            });
        }

      });
      // postData.imageUrl = imageUrl;
      // console.log("postData.url", postData.url)
      // await this.updatePostToFirebase(postId, postData);
    }
  }

  onDelete() {
    if (this.id) {
      this.spinServ.requestStarted();
      this.blogPostServ.deletePostFromFirebase(this.id)
        .then(() => {
          this.router.navigateByUrl('/admin/blogposts');
          this.spinServ.requestEnded();
        })
        .catch((error) => {
          console.error("Error deleting post: ", error);
          this.spinServ.requestEnded();
        });
    }

  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
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
}

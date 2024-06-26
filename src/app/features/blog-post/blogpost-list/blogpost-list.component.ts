import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { ImageModalComponent } from 'src/app/shared/components/image-modal/image-modal.component';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { CategoryService } from '../../category/services/category.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit, OnDestroy {

  blogPost$?: Observable<BlogPost[]>;

  blogsFromFirebase?: any
  deleteBlogPostSubscription?: Subscription;
  subscription = new Subscription();

  categories?: any;
  constructor(
    private blogPostServ: BlogPostService,
    private spinServ: SpinnerService,
    private modalService: ModalService,
    private toastServ: ToastService,
    private categoryServ: CategoryService
  ) {

  }


  onDelete(id: string) {
    console.log("id", id)
    // if (id) {
    //   this.deleteBlogPostSubscription = this.blogPostServ.deleteBlogPost(id).subscribe({
    //     next: (response) => {
    //       this.blogPost$ = this.blogPostServ.getAllBlogPosts();
    //     }
    //   })
    // }
    if (id) {
      this.spinServ.requestStarted();
      this.blogPostServ.deletePostFromFirebase(id)
        .then(() => {
          this.toastServ.showToast('success', `Post deleted successfully!`, '', true);
          this.blogPostServ.getAllBlogPostsFromFirebase().then((data) => {
            this.blogsFromFirebase = data;
            this.spinServ.requestEnded();
          })
            .catch((error) => {
              this.spinServ.requestEnded();
            });
        })
        .catch((error) => {
          this.toastServ.showToast('error', `Error when deleting post!`, '', true);
          this.spinServ.requestEnded();
        });
    }

  }

  ngOnInit(): void {
    // get all blogpost from api
    // this.blogPost$ = this.blogPostServ.getAllBlogPosts();
    this.blogPostServ.getAllBlogPostsFromFirebase().then((data) => {
      this.blogsFromFirebase = data;
      this.spinServ.requestEnded();
    })
      .catch((error) => {
        this.spinServ.requestEnded();
      });

    this.categoryServ.getAllCategoriesFromFirebase().subscribe({
      next: (res) => {
        this.spinServ.requestStarted();
        this.categories = res;
        this.spinServ.requestEnded();
      }
    })
  }

  openImage(content: any): void {
    console.log("content", content)
    this.subscription.add(
      this.modalService.createModalMD<ImageModalComponent, any>(
        '',
        ImageModalComponent,
        {
          imageUrl: content
        },
        {
          nzClosable: false,
          nzFooter: null,
          nzBodyStyle: {
            height: 'max-content',
          },
        }
      )
        .subscribe({
          next: res => {
            // if (res) {
            //   this.getHpDetail(this.appNo ?? '', this.appRev);
            // }
          },
        })
    )
  }

  getCategoryNameById(categoryId: string): string {
    console.log("categoryId", categoryId);
    const category = this.categories?.find((cat: any) => {
      console.log("cat.id", cat.id);
      return cat.id === categoryId;  // Added return statement here
    });
    console.log("category", category);
    return category ? category?.categoryName : 'Unknown Category';  // Ensure 'name' is the correct property
  }

  ngOnDestroy(): void {
    this.deleteBlogPostSubscription?.unsubscribe();
    this.subscription.unsubscribe();
  }


}

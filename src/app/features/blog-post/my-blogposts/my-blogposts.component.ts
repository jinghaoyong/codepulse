import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { ImageModalComponent } from 'src/app/shared/components/image-modal/image-modal.component';

@Component({
  selector: 'app-my-blogposts',
  templateUrl: './my-blogposts.component.html',
  styleUrls: ['./my-blogposts.component.scss']
})
export class MyBlogpostsComponent implements OnInit, OnDestroy {
  user?: User;
  getBlogPostsSubscription?: Subscription;
  blogsFromFirebase: any;
  subscription = new Subscription();

  constructor(
    private blogPostServ: BlogPostService,
    private authServ: AuthService,
    private spinServ: SpinnerService,
    private modalService: ModalService
  ) {
    this.user = this.authServ.getUser();
  }
  ngOnInit(): void {
    if (this.user?.uid) {
      this.getBlogPostsSubscription = this.blogPostServ.getPostsByCreatorIdFromFirebase(this.user?.uid)
        .subscribe({
          next: (data: any) => {
            console.log("data", data)
            this.blogsFromFirebase = data;
          }
        })
    }

  }

  openBanModal(id: string): void {

    this.subscription.add(
      this.modalService.createModalConfirmSM<ModalConfirmComponent, any>(
        '',
        ModalConfirmComponent,
        {
          title: 'Are you sure you want to delete this post?',
          subTitle: '',
        },
        {
          nzClosable: false,
          nzOkText: 'Yes, I Confirm',
          nzOnOk: () => {
            this.onDelete(id)
          },
        },
        'confirm'
      )
    );
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
          console.log("Post deleted successfully!");
          this.blogPostServ.getAllBlogPostsFromFirebase().then((data) => {
            this.blogsFromFirebase = data;
            this.spinServ.requestEnded();
          })
            .catch((error) => {
              this.spinServ.requestEnded();
            });
        })
        .catch((error) => {
          console.error("Error deleting post: ", error);
          this.spinServ.requestEnded();
        });
    }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

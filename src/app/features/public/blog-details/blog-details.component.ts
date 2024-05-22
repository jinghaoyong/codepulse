import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import * as firebase from 'firebase/compat';
import firebase from 'firebase/compat/app'
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  id: string | null = null;
  blogPost?: any;
  constructor(
    private route: ActivatedRoute,
    private blogPostServ: BlogPostService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private spinServ: SpinnerService,
    private toastServ: ToastService
  ) {

  }

  ngOnInit(): void {
    this.spinServ.requestStarted();

    console.log("got come in")
    this.route.paramMap
      .subscribe({
        next: (params) => {
          this.id = params.get('id');
          console.log(`this.id = params.get('id');`, this.id)
          if (this.id) {
            this.blogPostServ.incrementViewCount(this.id)
              .then(() => {
                console.log('View count incremented successfully');
                this.spinServ.requestEnded();
              })
              .catch((error: any) => {
                this.toastServ.showToast('error', `Error incrementing view count!`, '', true);
                this.spinServ.requestEnded();
              });
          }


        }
      })

    //fetch blog details by url
    if (this.id) {
      this.spinServ.requestStarted();
      this.blogPostServ.getPostByIdFromFirebase(this.id).then((postData) => {
        if (postData) {
          console.log("Post data:", postData);
          this.blogPost = postData;
          // this.blogPost = {
          //   ...postData,
          //   publishedDate: (postData.publishedDate as firebase.firestore.Timestamp).toDate()
          // };
          // this.selectedCategories = postData.categories.map(x => x.id);
          this.spinServ.requestEnded();
        } else {
          this.toastServ.showToast('error', `Post not found!`, '', true);
          this.spinServ.requestEnded();
        }
      })
        .catch((error) => {
          this.toastServ.showToast('error', `Error retrieving post!`, '', true);
        });
    }



  }

}

import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable, map, switchMap } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  createBlogPost(data: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts?addAuth=true`, data);
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
  }

  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`, updatedBlogPost);
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }

  //  *************     firebase    *************
  //  *************     firebase    *************
  async getAllBlogPostsFromFirebase(): Promise<any> {
    return this.firestore.collection('posts').snapshotChanges();
  }

  async uploadImageToFireStore(event: any, postId: string): Promise<string> {
    const file = event.target.files[0];
    const filePath = `zenImageFolder/${postId}_${file.name}`;
    const fileRef = this.storage.ref(filePath);

    try {
      await fileRef.put(file);
      const downloadUrl = await fileRef.getDownloadURL().toPromise();
      console.log('Image uploaded:', downloadUrl);
      return downloadUrl.toString();
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  }
  async deleteImageFromFirebase(imageUrl: string): Promise<void> {
    try {
      console.log("want to delete > ", imageUrl);
      const imageRef = this.storage.refFromURL(imageUrl);
      await imageRef.delete().toPromise(); // Convert Observable to Promise
      console.log('Image deleted successfully.');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  async createPostToFirebase(postData: any, event: any): Promise<any> {
    try {
      const docRef = await this.firestore.collection('posts').add(postData);
      const postId = docRef.id;
      console.log("Post created successfully! > postId", postId);
      if (event) {
        const imageUrl = await this.uploadImageToFireStore(event, postId);
        postData.imageUrl = imageUrl;
        console.log("postData.url", postData.url)
      }
      await this.updatePostToFirebase(postId, postData);

      return postId;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error; // Propagate the error to the caller
    }
  }

  updatePostToFirebase(postId: any, newData: any): Promise<any> {
    const postPromise = this.firestore.collection('posts').doc(postId).update(newData);
    console.log("updatePostToFirebase > postPromise", postPromise)
    return postPromise;
  }

  deletePostFromFirebase(postId: string): Promise<void> {
    return this.firestore.collection('posts').doc(postId).delete();
  }

  async getPostByIdFromFirebase(postId: string): Promise<any> {
    return this.firestore.collection('posts').doc(postId).get().toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log("No such document!");
          return null;
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
        throw error;
      });
  }

  async getPostsByCategoryIdFromFirebase(categoryId: string): Promise<any> {
    return this.firestore.collection('posts', ref => ref.where('categoryId', '==', categoryId)).snapshotChanges();
    // .pipe(
    //   switchMap((actions: any) => {
    //     return actions.map((a: any) => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   })
    // );
  }

  getPostsByCreatorIdFromFirebase(creatorId: string): Observable<any[]> {
    return this.firestore.collection('posts', ref => ref.where('createdById', '==', creatorId))
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

}

import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BlogPostService } from '../../blog-post/services/blog-post.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private cookieServ: CookieService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private blogServ: BlogPostService
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories?addAuth=true`, model);
  }

  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}?addAuth=true`, updateCategoryRequest);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}?addAuth=true`);
  }

  // *********** Firebase ***********
  async getAllCategoriesFromFirebase(): Promise<any> {
    return this.firestore.collection('categories').snapshotChanges();
  }

  getCategoryByIdFromFirebase(categoryId: string): Observable<any> {
    return this.firestore.collection('categories').doc(categoryId).snapshotChanges()
      .pipe(
        map((snapshot: any) => {
          const data = snapshot.payload.data();
          const id = snapshot.payload.id;
          return { id, ...data };
        })
      );
  }

  async createCategoryToFirebase(categoryData: any, event: any): Promise<any> {
    try {
      const docRef = await this.firestore.collection('categories').add(categoryData);
      const categoryId = docRef.id;
      console.log("categories created successfully! > categoryId", categoryId);
      if (event) {
        const imageUrl = await this.blogServ.uploadImageToFireStore(event, categoryId);
        categoryData.categoryImage = imageUrl;
        console.log("categoryData.categoryImage", categoryData)
      }
      await this.updateCategoryToFirebase(categoryId, categoryData);

      return categoryId;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error; // Propagate the error to the caller
    }
  }

  updateCategoryToFirebase(categoryId: any, newData: any): Promise<any> {
    const postPromise = this.firestore.collection('categories').doc(categoryId).update(newData);
    console.log("updateCategoryToFirebase > postPromise", postPromise)
    return postPromise;
  }

  deleteCategoryFromFirebase(categoryId: string): Promise<void> {
    return this.firestore.collection('categories').doc(categoryId).delete();
  }


}

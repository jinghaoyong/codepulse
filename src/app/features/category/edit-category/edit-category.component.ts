import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

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
  category?: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryServ: CategoryService,
    private router: Router,
    private toastServ: ToastService
  ) {

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.categoryServ.getCategoryById(this.id).subscribe({
            next: (res) => {
              this.category = res;
            }
          })
        }
      }
    })
  }

  onFormSubmit(): void {
    console.log(this.category);
    // const updateCategoryRequest: UpdateCategoryRequest = {
    //   name: this.category?.name ?? '',
    //   urlHandle: this.category?.urlHandle ?? ''
    // }

    // // pass this object to service
    // if (this.id) {
    //   this.editCategorySubscription = this.categoryServ.updateCategory(this.id, updateCategoryRequest).subscribe({
    //     next: (res) => {
    //       this.router.navigateByUrl('/admin/categories');
    //     }
    //   })
    // }

  }

  onDelete(): void {
    if (this.id) {
      this.deleteCategorySubscription = this.categoryServ.deleteCategory(this.id).subscribe({
        next: (res) => {
          this.toastServ.showToast('error', "Deleted !!", 'top-left', true)
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }

}

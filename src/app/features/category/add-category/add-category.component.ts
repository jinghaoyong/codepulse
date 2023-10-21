import { CategoryService } from './../services/category.service';
import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(private categoryServ: CategoryService, private router: Router) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }


  onFormSubmit() {
    console.log('clicked on form submit')
    this.addCategorySubscription = this.categoryServ.addCategory(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/admin/categories');
        console.log("next : response", res)

      },
      error: (res) => {
        console.log("error : response", res)
      }
    })
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}

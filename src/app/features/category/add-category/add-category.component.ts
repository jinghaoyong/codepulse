import { CategoryService } from './../services/category.service';
import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  model: AddCategoryRequest;

  constructor(private categoryServ: CategoryService) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }

  onFormSubmit() {
    console.log('clicked on form submit')
    this.categoryServ.addCategory(this.model).subscribe({
      next:(res)=>{
        console.log("next : response", res)

      },
      error:(res)=>{
        console.log("error : response", res)
      }
    })
  }
}

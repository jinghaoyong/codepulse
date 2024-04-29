import { CategoryService } from './../services/category.service';
import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  // model: AddCategoryRequest;
  model: any;
  private addCategorySubscription?: Subscription;


  imageFileEventData?: any;
  imageFileUrl?: any;

  constructor(
    private categoryServ: CategoryService,
    private router: Router,
    private spinServ: SpinnerService,
    private location: Location
  ) {
    this.model = {
      categoryName: '',
      categoryImage: '',
      categoryDescription: ''
    };
  }


  onFormSubmit() {
    console.log('clicked on form submit')
    // this.addCategorySubscription = this.categoryServ.addCategory(this.model).subscribe({
    //   next: (res) => {
    //     this.router.navigateByUrl('/admin/categories');
    //     console.log("next : response", res)

    //   },
    //   error: (res) => {
    //     console.log("error : response", res)
    //   }
    // })

    this.spinServ.requestStarted();

    this.categoryServ.createCategoryToFirebase(this.model, this.imageFileEventData).then(() => {
      this.spinServ.requestEnded();
      // this.router.navigate(['/']);
      this.location.back();

    }).catch((error) => {
      this.spinServ.requestEnded();
      console.error("Error retrieving post: ", error);
    });

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


  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}

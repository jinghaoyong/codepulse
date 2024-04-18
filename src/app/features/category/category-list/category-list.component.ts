import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  // categories?: Category[];
  categories$?: Observable<Category[]>;
  categories?: any;
  subscription = new Subscription();

  constructor(
    private categoryServ: CategoryService,
    private modalService: ModalService,
    private spinService: SpinnerService
  ) {

  }
  ngOnInit(): void {
    this.categoryServ.getAllCategoriesFromFirebase().then((data: any) => {
      console.log("data",data)
      this.categories = data;
    });
    // .subscribe({
    //   next: (res) => {
    //     console.log("res here", res)
    //     this.categories = res;
    //   }
    // });

    // this.openBanModal("hahaha");
    // this.spinService.requestStarted();
    // setTimeout(() => {
    //   this.spinService.requestEnded();
    // }, 3000);
  }

  openBanModal(id: string): void {

    this.subscription.add(
      this.modalService.createModalConfirmSM<ModalConfirmComponent, any>(
        '',
        ModalConfirmComponent,
        {
          title: 'haha',
          subTitle: 'haha',
        },
        {
          nzClosable: false,
          nzOkText: 'Yes, I Confirm',
          nzOnOk: () => {
            console.log("haha")
          },
        },
        'confirm'
      )
    );
  }


}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  // categories?: Category[];
  categories$?: Observable<Category[]>;

  subscription = new Subscription();
  
  constructor(
    private categorySer: CategoryService,
    private modalService: ModalService,
    ) {

  }
  ngOnInit(): void {
    this.categories$ = this.categorySer.getAllCategories();
    // .subscribe({
    //   next: (res) => {
    //     console.log("res here", res)
    //     this.categories = res;
    //   }
    // });

    this.openBanModal("hahaha");
  }

  openBanModal(id: string): void {

    this.subscription.add(
      this.modalService.createModalConfirmSM<ToastComponent, any>(
        '',
        ToastComponent,
        {
          title: '_MODAL.TITLE',
          subTitle: '_MODAL.CONTENT',
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

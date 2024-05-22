import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Location } from '@angular/common';
import { ImageModalComponent } from 'src/app/shared/components/image-modal/image-modal.component';

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
    private spinService: SpinnerService,
    private toastServ: ToastService,
    private location: Location,
    private spinServ: SpinnerService
  ) {

  }
  ngOnInit(): void {
    this.categoryServ.getAllCategoriesFromFirebase().subscribe({
      next: (res) => {
        this.categories = res;

        console.log("this.categories", this.categories)
      }
    })
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
          title: 'Are you sure you want to delete this category?',
          subTitle: '',
        },
        {
          nzClosable: false,
          nzCancelText: 'Cancel',
          nzOkText: 'Yes, I Confirm',
          nzOnOk: () => {
            this.onDelete(id)
          },
        },
        'confirm'
      )
    );
  }

  onDelete(id: string): void {
    if (id) {
      this.categoryServ.deleteCategoryFromFirebase(id).then(() => {
        this.toastServ.showToast('success', "Category Successfully Deleted !!", 'top-left', true)
      }).catch((error) => {
        this.spinServ.requestEnded();
        console.error("Error when delete category: ", error);
      })
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

}

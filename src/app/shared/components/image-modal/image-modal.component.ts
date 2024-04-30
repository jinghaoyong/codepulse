import { Component, Inject, Input, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
  @Input()
  data!: any;

  imageUrl?: string;

  constructor() {

  }
  ngOnInit(): void {
    console.log("imageUrl", this.data)
    if (this.data) {
      setTimeout(() => {
        if (this.data?.imageUrl) {
          this.imageUrl = this.data.imageUrl;
        }
      }, 0);
    }
  }
}

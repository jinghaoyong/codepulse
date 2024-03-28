import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

export interface IModalConfirm {
  title: string;
  subTitle: string;
}

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {
  @Input() data!: IModalConfirm;
  prefixTranslate: string = 'MODAL_CONFIRM.';

  constructor(private modal: NzModalRef) {
    this.modal.updateConfig({ nzWrapClassName: 'modal-confirm' });
  }

  ngOnInit(): void {}

  handleCancel() {
    this.modal.destroy(null);
  }
  handleConfirm() {
    this.modal.destroy(this.data);
  }
}

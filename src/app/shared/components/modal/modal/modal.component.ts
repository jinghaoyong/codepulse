import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

export interface IModalConfirm {
  title: string;
  subTitle: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() data!: IModalConfirm;

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

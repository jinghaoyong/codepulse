import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() data!: any;
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

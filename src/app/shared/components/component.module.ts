import { NgModule } from '@angular/core';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ToastComponent } from './toast/toast.component';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ModalConfirmComponent,
        SpinnerComponent,
        ToastComponent,
        ImageSelectorComponent
    ],
    imports: [
        NzDrawerModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ModalConfirmComponent,
        SpinnerComponent,
        ToastComponent,
        ImageSelectorComponent
    ],
})
export class ComponentModule { }

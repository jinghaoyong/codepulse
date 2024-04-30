import { Injectable, Type } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of, Subject } from 'rxjs';
import { MODAL_SIZE } from 'src/app/shared/types/constants/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private modal: NzModalService,
    private translateServ: TranslateService
  ) { }

  public open<T, D>(
    title: string,
    content: Type<T>,
    data: D | undefined,
    option: ModalOptions = {},
    modalType?: 'confirm' | 'normal'
  ): Subject<D | null> {
    const subject = new Subject<D | null>();

    this.getObservableTranslate(title).subscribe((res: string) => {
      option.nzTitle = res;

      let _modal;

      switch (modalType) {
        case 'normal':
          _modal = this.modal.create({
            nzContent: content,
            nzBodyStyle: {
              maxHeight: 'calc(100vh - 250px)',
              overflowY: 'auto',
            },
            ...option,
          });
          break;
        case 'confirm':
          _modal = this.modal.confirm({
            nzContent: content,
            nzBodyStyle: {
              maxHeight: 'calc(100vh - 250px)',
              overflowY: 'auto',
            },
            ...option,
          });
          break;
        default:
          _modal = this.modal.create({
            nzContent: content,
            nzBodyStyle: {
              maxHeight: 'calc(100vh - 250px)',
              overflowY: 'auto',
            },
            ...option,
          });
          break;
      }

      const instance = _modal.getContentComponent();
      instance.data = data;

      _modal.afterClose.subscribe((result: D | null) => {
        subject.next(result);
        subject.complete();
      });
    });

    return subject;
  }

  /**
   * Create a modal with small size 600px
   * @param title title of modal
   * @param content content of modal this is a custom component
   * @param data Data inject to modal
   * @param T type of custom component
   * @param D type of data inject to custom component and return when closed modal
   * @returns Subject<D | null>
   */
  public createModalSM<T, D>(
    title: string,
    content: Type<T>,
    data: D | undefined,
    option: ModalOptions = {}
  ): Subject<D | null> {
    return this.open(title, content, data, {
      nzWidth: MODAL_SIZE.SM,
      ...option,
    });
  }

  /**
   * Create a modal with medium size 852px
   * @param title title of modal
   * @param content content of modal
   * @param data Data inject to modal
   * @param T type of custom component
   * @param D type of data inject to custom component and return when closed modal
   * @returns Subject<D | null>
   */
  public createModalMD<T, D>(
    title: string,
    content: Type<T>,
    data: D,
    option: ModalOptions = {}
  ): Subject<D | null> {
    return this.open(title, content, data, {
      nzWidth: MODAL_SIZE.MD,
      ...option,
    });
  }

  /**
   * Create a modal with large size 1080px
   * @param title title of modal
   * @param content content of modal
   * @param data Data inject to modal
   * @param T type of custom component
   * @param D type of data inject to custom component and return when closed modal
   * @returns Subject<D | null>
   */
  public createModalLG<T, D>(
    title: string,
    content: Type<T>,
    data: D,
    option: ModalOptions = {}
  ): Subject<D | null> {
    return this.open(title, content, data, {
      nzWidth: MODAL_SIZE.LG,
      ...option,
    });
  }

  /**
   * Create a modal with large size 464px
   * @param title title of modal
   * @param content content of modal
   * @param data Data inject to modal
   * @param T type of custom component
   * @param D type of data inject to custom component and return when closed modal
   * @returns Subject<D | null>
   */
  public createModalXS<T, D>(
    title: string,
    content: Type<T>,
    data: D,
    option: ModalOptions = {}
  ): Subject<D | null> {
    return this.open(title, content, data, {
      nzWidth: MODAL_SIZE.XS,
      ...option,
    });
  }

  /**
   * Create a modal with small size 600px
   * @param title title of modal
   * @param content content of modal this is a custom component
   * @param data Data inject to modal
   * @param T type of custom component
   * @param D type of data inject to custom component and return when closed modal
   * @returns Subject<D | null>
   */
  public createModalConfirmSM<T, D>(
    title: string,
    content: Type<T>,
    data: D | undefined,
    option: ModalOptions = {},
    modalType?: 'confirm' | 'normal'
  ): Subject<D | null> {
    return this.open(
      title,
      content,
      data,
      {
        nzWidth: MODAL_SIZE.SM,
        ...option,
      },
      modalType
    );
  }

  private getObservableTranslate(key: string): Observable<string> {
    if (!key) {
      return of('');
    }
    return this.translateServ.get(key);
  }
}

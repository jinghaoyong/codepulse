import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  status: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  timer: any;
  constructor() { }

  showToast(type: string, msg: string, position: string, autoClose: boolean) {
    localStorage.setItem("toastrType", type)
    localStorage.setItem("toastrPosition", position)
    this.status.next(msg)

    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (autoClose) {
      this.timer = window.setTimeout(() => {
        this.status.next(null);
      }, 4000);
    }
  }
}

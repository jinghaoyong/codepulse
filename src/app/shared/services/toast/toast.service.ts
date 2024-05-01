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
    try {
      console.log("type sky", type);
      localStorage.setItem("toastrType", type);
      localStorage.setItem("toastrPosition", position);
      console.log("local setted");
      this.status.next(msg);
      console.log("    this.status.next(msg)");

      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (autoClose) {
        this.timer = window.setTimeout(() => {
          console.log("1         this.status.next(null);");
          this.status.next(null);
          console.log("2         this.status.next(null);");
        }, 3000);
      }
    } catch (error) {

      alert("An error occurred while showing toast:");
      // You can handle the error here, or rethrow it if necessary
      throw error;
    }
  }

}

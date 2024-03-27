import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  showToast = false;
  toastrMessage = "";
  toastrType = "";
  toastrPosition = "";

  constructor(
    private toastr: ToastService
  ) { }

  ngOnInit(): void {
    this.showToast = true;
    this.toastr.status.subscribe((msg: string) => {
      this.toastrType = localStorage.getItem("toastrType") || "";
      this.toastrPosition = localStorage.getItem("toastrPosition") || "";
      if (msg === null) {
        this.showToast = false;
      } else {
        this.showToast = true;
        this.toastrMessage = msg;
      }
    })
  }
  closeToast() {
    this.showToast = false;
  }
}

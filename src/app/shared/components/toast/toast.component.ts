import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() showToast: boolean = false;

  private status: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.showToast = true;
  }

  closeToast() {
    this.showToast = false;
  }
}

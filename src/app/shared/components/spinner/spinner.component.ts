import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  isShowSpinner = true;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(
    private spinnerServ: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.spinnerServ.getSpinnerObserver().subscribe(status => {
      this.isShowSpinner = status === 'start';
      this.cdRef.detectChanges();
    });
  }
}

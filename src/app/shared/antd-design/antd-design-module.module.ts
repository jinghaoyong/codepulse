import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

@NgModule({
  exports: [
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzSelectModule,
    NzDropDownModule,
    NzTagModule,
    NzStepsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzDatePickerModule,
    NzRadioModule,
    NzSwitchModule,
    NzUploadModule,
    NzCollapseModule,
    NzTypographyModule,
    NzModalModule,
    NzCheckboxModule,
    NzInputNumberModule,
    NzSpaceModule,
    NzTabsModule,
    NzMessageModule,
    NzSpinModule,
    NzFormModule,
    NzPopoverModule,
    NzEmptyModule,
    NzDividerModule,
    NzAutocompleteModule,
  ],
})
export class AntdDesignModule {}

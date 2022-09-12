import { NgModule } from '@angular/core';
import { InputModeSelectorComponent } from './input-mode-selector.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [InputModeSelectorComponent],
  imports: [SharedModule, NgbDropdownModule],
  exports: [
    InputModeSelectorComponent,
  ],
})
export class InputModeSelectorModule {
}

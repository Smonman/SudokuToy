import { NgModule } from '@angular/core';
import { TimerComponent } from './timer.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [TimerComponent],
  imports: [SharedModule],
  exports: [TimerComponent],
})
export class TimerModule {
}

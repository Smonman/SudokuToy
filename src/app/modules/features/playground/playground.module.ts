import { NgModule } from '@angular/core';
import { PlaygroundComponent } from './playground.component';
import { SharedModule } from '../../shared/shared.module';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { SudokuModule } from '../sudoku/sudoku.module';
import { TimerModule } from '../timer/timer.module';
import { InputModeSelectorModule } from '../input-mode-selector/input-mode-selector.module';

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [SharedModule, PlaygroundRoutingModule, SudokuModule, TimerModule, InputModeSelectorModule],
})
export class PlaygroundModule {
}

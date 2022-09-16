import { NgModule } from '@angular/core';
import { PlaygroundComponent } from './playground.component';
import { SharedModule } from '../../shared/shared.module';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { InputModeSelectorComponent } from './components/input-mode-selector/input-mode-selector.component';
import { TimerComponent } from './components/timer/timer.component';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { SudokuCellComponent } from './components/sudoku/sudoku-cell/sudoku-cell.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PlaygroundComponent,
    InputModeSelectorComponent,
    TimerComponent, SudokuComponent,
    SudokuCellComponent,
  ],
  imports: [SharedModule, PlaygroundRoutingModule, NgbDropdownModule],
})
export class PlaygroundModule {
}

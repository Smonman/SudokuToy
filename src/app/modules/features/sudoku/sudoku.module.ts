import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SudokuComponent } from './sudoku.component';
import { SudokuCellComponent } from './components/sudoku-cell/sudoku-cell.component';

@NgModule({
  declarations: [SudokuComponent, SudokuCellComponent],
  imports: [SharedModule],
  exports: [SudokuComponent],
})
export class SudokuModule {
}

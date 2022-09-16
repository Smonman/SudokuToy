import { Component, OnDestroy, OnInit } from '@angular/core';
import { SudokuService } from '../../services/sudoku.service';
import { InputMode } from '../../../../shared/classes/input-mode';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-input-mode-selector',
  templateUrl: './input-mode-selector.component.html',
  styleUrls: ['./input-mode-selector.component.scss'],
})
export class InputModeSelectorComponent implements OnInit, OnDestroy {

  public inputModes: InputMode[] = [];
  public curInputMode: InputMode | null = null;
  public curInputModeIndex: number = 0;
  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit(): void {
    this.inputModes = this.sudokuService.getInputModes();

    this.sudokuService.$curInputModeIndex
      .pipe(takeUntil(this.$destroy))
      .subscribe((index: number) => {
        this.curInputModeIndex = index;
      });

    this.sudokuService.$curInputMode
      .pipe(takeUntil(this.$destroy))
      .subscribe((m: InputMode | null) => {
        this.curInputMode = m;
      });
  }

  setInputMode(index: number): void {
    this.sudokuService.setCurInputModeIndex(index);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

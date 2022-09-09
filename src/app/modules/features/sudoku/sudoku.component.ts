import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SudokuService } from './services/sudoku.service';
import { Subject, takeUntil } from 'rxjs';
import { InputMode } from '../../shared/classes/input-mode';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css'],
})
export class SudokuComponent implements OnInit, OnDestroy {
  public size: number = 0;
  public boxWidth: number = 0;
  public boxHeight: number = 0;
  public verticalBoxCount: number = 0;
  public horizontalBoxCount: number = 0;
  public curInputMode: InputMode | null = null;
  public curInputModeIndex: number = 0;

  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit(): void {
    this.sudokuService.$size
      .pipe(takeUntil(this.$destroy))
      .subscribe((size: number) => this.size = size);

    this.sudokuService.$boxWidth
      .pipe(takeUntil(this.$destroy))
      .subscribe((boxWidth: number) => this.boxWidth = boxWidth);

    this.sudokuService.$boxHeight
      .pipe(takeUntil(this.$destroy))
      .subscribe((boxHeight: number) => this.boxHeight = boxHeight);

    this.sudokuService.$verticalBoxCount
      .pipe(takeUntil(this.$destroy))
      .subscribe((verticalBoxCount: number) => this.verticalBoxCount = verticalBoxCount);

    this.sudokuService.$horizontalBoxCount
      .pipe(takeUntil(this.$destroy))
      .subscribe((horizontalBoxCount: number) => this.horizontalBoxCount = horizontalBoxCount);

    this.sudokuService.$curInputModeIndex
      .pipe(takeUntil(this.$destroy))
      .subscribe((index: number) => this.curInputModeIndex = index);

    this.sudokuService.$curInputMode
      .pipe(takeUntil(this.$destroy))
      .subscribe((im: InputMode | null) => this.curInputMode = im);
  }

  @HostListener('window:keyup', ['$event'])
  clearSelection(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.sudokuService.setSelectedCellIds([]);
      this.sudokuService.setHighlightedCellIds([]);
    } else if (e.key === 'Tab' || e.key === ' ') {
      this.sudokuService.switchInput();
    }
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

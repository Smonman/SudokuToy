import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SudokuService } from "./services/sudoku.service";
import { Subject, takeUntil } from "rxjs";
import { InputMode } from "../../shared/classes/input-mode";

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit, OnDestroy {
  public size: number = 0;
  public blockWidth: number = 0;
  public blockHeight: number = 0;
  public verticalBlockCount: number = 0;
  public horizontalBlockCount: number = 0;
  public curInputMode: InputMode | null = null;
  public curInputModeIndex: number = 0;

  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit(): void {
    this.sudokuService.$size
      .pipe(takeUntil(this.$destroy))
      .subscribe((size: number) => this.size = size);

    this.sudokuService.$blockWidth
      .pipe(takeUntil(this.$destroy))
      .subscribe((blockWidth: number) => this.blockWidth = blockWidth);

    this.sudokuService.$blockHeight
      .pipe(takeUntil(this.$destroy))
      .subscribe((blockHeight: number) => this.blockHeight = blockHeight);

    this.sudokuService.$verticalBlockCount
      .pipe(takeUntil(this.$destroy))
      .subscribe((verticalBlockCount: number) => this.verticalBlockCount = verticalBlockCount);

    this.sudokuService.$horizontalBlockCount
      .pipe(takeUntil(this.$destroy))
      .subscribe((horizontalBlockCount: number) => this.horizontalBlockCount = horizontalBlockCount);

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

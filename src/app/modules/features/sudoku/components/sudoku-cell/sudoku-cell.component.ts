import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { SudokuService } from "../../services/sudoku.service";
import { Subject, takeUntil } from "rxjs";
import { InputMode } from "../../../../shared/classes/input-mode";
import { ValueMode } from "../../value-mode";
import { CornerMode } from "../../corner-mode";
import { CenterMode } from "../../center-mode";

@Component({
  selector: 'app-sudoku-cell',
  templateUrl: './sudoku-cell.component.html',
  styleUrls: ['./sudoku-cell.component.css']
})
export class SudokuCellComponent implements OnInit, OnDestroy {

  @Input() row: number = 0;
  @Input() col: number = 0;

  public sudokuSize: number = 0;
  public id: number = -1;
  public blockId: number = -1;
  public selected: boolean = false;
  public highlighted: boolean = false;
  public readonly: boolean = false;
  public curInputModeIndex: number = 0;
  public inputModes: InputMode[] = [];
  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit(): void {
    this.sudokuSize = this.sudokuService.getSize();
    this.id = this.row * this.sudokuSize + this.col;
    this.blockId = Math.floor(this.row / this.sudokuService.getBlockHeight()) * this.sudokuService.getHorizontalBlockCount() + Math.floor(this.col / this.sudokuService.getBlockWidth());

    this.inputModes = [new ValueMode(), new CornerMode(), new CenterMode()];
    this.sudokuService.setInputModeCount(this.inputModes.length);

    this.sudokuService.$selectedCellIds
      .pipe(takeUntil(this.$destroy))
      .subscribe((ids: number[]) => {
        this.selected = ids.includes(this.id);
      });

    this.sudokuService.$highlightedCellIds
      .pipe(takeUntil(this.$destroy))
      .subscribe((ids: number[]) => {
        this.highlighted = ids.includes(this.id);
      });

    this.sudokuService.$clearCells
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => this.clearCell());

    this.sudokuService.$puzzle
      .pipe(takeUntil(this.$destroy))
      .subscribe((p: string | null) => {
        const v = Number(p?.charAt(this.id)) || null;
        this.inputModes[0].updateValue(v);
        this.readonly = Boolean(v);
      });

    this.sudokuService.$curInputModeIndex
      .pipe(takeUntil(this.$destroy))
      .subscribe((index: number) => {
        this.curInputModeIndex = index;
      });
  }

  @HostListener('mouseup', ['$event'])
  updateSelected(e: MouseEvent): void {
    if (e.ctrlKey) {
      this.sudokuService.updateSelectedCellId(this.id)
      this.sudokuService.setHighlightedCellIds([]);
    } else {
      this.sudokuService.setSelectedCellIds([this.id]);
      this.sudokuService.setHighlightedCellIds(this.computeHighlightedCellIds());
    }
  }

  @HostListener('window:keyup', ['$event'])
  updateInput(e: KeyboardEvent): void {
    if (this.selected && !this.readonly) {
      if (Number(e.key)) {
        this.curInputMode().updateValue(Number(e.key));
        console.log('update value:', Number(e.key));
        console.log('value:', this.curInputMode().value);
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        this.curInputMode().updateValue(null);
      }
    }
  }

  curInputMode(): InputMode {
    return this.inputModes[this.curInputModeIndex];
  }

  switchInputMode(): void {
    this.sudokuService.setCurInputModeIndex((this.curInputModeIndex + 1) % this.inputModes.length);
  }

  computeHighlightedCellIds(): number[] {
    let ids = new Set<number>();
    let rowCounter = 0;
    while (rowCounter < this.sudokuSize) {
      ids.add(rowCounter * this.sudokuSize + this.col);
      rowCounter++;
    }
    let colCounter = 0;
    while (colCounter < this.sudokuSize) {
      ids.add(colCounter + this.row * this.sudokuSize);
      colCounter++;
    }
    return Array.from(ids);
  }

  clearCell(): void {
    for (const inputMode of this.inputModes) {
      inputMode.updateValue(null);
    }
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { SudokuService } from '../../services/sudoku.service';
import { Subject, takeUntil } from 'rxjs';
import { InputMode } from '../../../../shared/classes/input-mode';
import { lightAppearAnimation } from '../../../../shared/animations/light-appear.animation';

@Component({
  selector: 'app-sudoku-cell',
  templateUrl: './sudoku-cell.component.html',
  styleUrls: ['./sudoku-cell.component.scss'],
  animations: [lightAppearAnimation],
})
export class SudokuCellComponent implements OnInit, OnDestroy {
  @Input() row: number = 0;
  @Input() col: number = 0;

  public id: number = 0;
  public boxId: number = 0;
  public sudokuSize: number = 0;
  public selected: boolean = false;
  public highlighted: boolean = false;
  public readonly: boolean = false;
  public inputModes: InputMode[] = [];
  public curInputMode: InputMode | null = null;
  public curInputModeIndex: number = 0;
  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit(): void {
    this.sudokuSize = this.sudokuService.getSize();
    this.id = this.sudokuService.computeCellId(this.row, this.col);
    this.boxId = this.sudokuService.computeBoxId(this.row, this.col);

    this.sudokuService.$inputModes
      .pipe(takeUntil(this.$destroy))
      .subscribe((ims: InputMode[]) => {
        this.inputModes = ims;
      });

    this.sudokuService.$curInputMode
      .pipe(takeUntil(this.$destroy))
      .subscribe((im: InputMode | null) => {
        this.curInputMode = im;
      });

    this.sudokuService.$curInputModeIndex
      .pipe(takeUntil(this.$destroy))
      .subscribe((index: number) => {
        this.curInputModeIndex = index;
      });

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
        this.sudokuService.writeToInputMode(0, this.id, v);
        this.readonly = Boolean(v);
      });
  }

  @HostListener('mouseup', ['$event'])
  updateSelected(e: MouseEvent): void {
    if (e.ctrlKey) {
      this.sudokuService.updateSelectedCellId(this.id);
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
        this.curInputMode?.updateValue(this.id, Number(e.key));
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        this.curInputMode?.updateValue(this.id, null);
      }
    }
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
    for (const im of this.sudokuService.getInputModes()) {
      im.updateValue(this.id, null);
    }
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

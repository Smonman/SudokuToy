import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { SudokuService } from "../../services/sudoku.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-sudoku-cell',
  templateUrl: './sudoku-cell.component.html',
  styleUrls: ['./sudoku-cell.component.css']
})
export class SudokuCellComponent implements OnInit, OnDestroy {

  @Input() row: number = 0;
  @Input() col: number = 0;

  public sudokuSize: number | null = null;
  public id: number = -1;
  public blockId: number = -1;
  public selected: boolean = false;
  public highlighted: boolean = false;
  public readonly: boolean = false;
  public value: number | null = null;
  public cornerValues: number[] = [];
  public centerValues: number[] = [];
  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit(): void {
    this.sudokuService.$size
      .pipe(takeUntil(this.$destroy))
      .subscribe((s: number | null) => {
        this.sudokuSize = s;
        if (this.sudokuSize) {
          this.id = this.row * this.sudokuSize + this.col;
        } else {
          console.error("sudoku size is null");
        }
      })

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
      .subscribe(() => this.value = null);

    this.sudokuService.$puzzle
      .pipe(takeUntil(this.$destroy))
      .subscribe((p: string | null) => {
        this.value = Number(p?.charAt(this.id)) || null;
        this.readonly = Boolean(this.value);
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
      this.value = Number(e.key) || this.value;
      if (e.key === 'Backspace' || e.key === 'Delete') {
        this.value = null;
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

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

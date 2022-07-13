import { Component, HostListener, Input, OnInit } from '@angular/core';
import { SudokuService } from "./services/sudoku.service";

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {
  @Input() size: number = 9;
  @Input() blockWidth: number = 3;
  @Input() blockHeight: number = 3;

  public verticalBlockCount: number = -1;
  public horizontalBlockCount: number = -1;

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit(): void {
    this.verticalBlockCount = this.size / this.blockWidth;
    this.horizontalBlockCount = this.size / this.blockHeight;

    this.sudokuService.setSize(this.size);
    this.sudokuService.setVerticalBlockCount(this.verticalBlockCount);
    this.sudokuService.setHorizontalBlockCount(this.horizontalBlockCount);
    this.sudokuService.setBlockWidth(this.blockWidth);
    this.sudokuService.setBlockHeight(this.blockHeight);
  }

  @HostListener('window:keyup', ['$event'])
  clearSelection(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.sudokuService.setSelectedCellIds([]);
      this.sudokuService.setHighlightedCellIds([]);
    }
  }
}

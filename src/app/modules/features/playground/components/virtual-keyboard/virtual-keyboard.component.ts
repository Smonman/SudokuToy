import { Component, OnDestroy, OnInit } from '@angular/core';
import { SudokuService } from '../../services/sudoku.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss'],
})
export class VirtualKeyboardComponent implements OnInit, OnDestroy {

  public size: number | null = 0;
  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit(): void {
    this.sudokuService.$size
      .pipe(takeUntil(this.$destroy))
      .subscribe((size: number | null) => {
        this.size = size;
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

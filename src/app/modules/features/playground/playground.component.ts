import { Component, HostListener, OnInit } from '@angular/core';
import { SudokuService } from '../sudoku/services/sudoku.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit(): void {
  }

  @HostListener('window:keyup', ['$event'])
  test(e: KeyboardEvent): void {
    if (e.key === 't') {
      this.sudokuService.setPuzzle('.6.4...5.1.8.....7.....1.3...6.5...8...374...9...1.4...1.6.....3.....1.4.4...2.9.');
    }
  }
}

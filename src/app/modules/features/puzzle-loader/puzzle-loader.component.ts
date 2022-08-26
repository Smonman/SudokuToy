import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SudokuService } from "../sudoku/services/sudoku.service";
import { Subject, takeUntil } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-puzzle-loader',
  templateUrl: './puzzle-loader.component.html',
  styleUrls: ['./puzzle-loader.component.css']
})
export class PuzzleLoaderComponent implements OnInit, OnDestroy {

  puzzleForm = new FormGroup({
    puzzle: new FormControl('', [Validators.pattern('[\\.123456789 ]*')]),
    puzzleSize: new FormControl(null, [Validators.required, Validators.min(1)]),
    blockWidth: new FormControl(null, [Validators.required, Validators.min(1)]),
    blockHeight: new FormControl(null, [Validators.required, Validators.min(1)])
  })
  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService, private router: Router) {
  }

  onSubmit() {
    console.warn(this.puzzleForm.value);
    console.warn(this.puzzleForm.valid)
    this.sudokuService.setPuzzle(this.puzzleForm.value.puzzle);
    this.sudokuService.setSize(this.puzzleForm.value.size);
    this.sudokuService.setBlockWidth(this.puzzleForm.value.blockWidth);
    this.sudokuService.setBlockHeight(this.puzzleForm.value.blockHeight);

    this.router.navigateByUrl('');
  }

  ngOnInit(): void {
    this.puzzleForm.controls['puzzle'].valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe((change) => {
        const possiblePuzzleSize = Math.sqrt(change.trim().length);
        if (possiblePuzzleSize - Math.trunc(possiblePuzzleSize) === 0) {
          this.puzzleForm.controls['puzzleSize'].patchValue(possiblePuzzleSize);
        } else {
          this.puzzleForm.controls['puzzleSize'].patchValue(null);
        }
      });
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

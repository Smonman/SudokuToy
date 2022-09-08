import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SudokuService } from '../sudoku/services/sudoku.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { FormBase } from '../../shared/classes/form-base';
import { isInteger, toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-puzzle-loader',
  templateUrl: './puzzle-loader.component.html',
  styleUrls: ['./puzzle-loader.component.css'],
})
export class PuzzleLoaderComponent extends FormBase implements OnInit, OnDestroy {

  puzzleForm = new FormGroup({
    puzzle: new FormControl('', [Validators.pattern('[\\.123456789 ]*')]),
    puzzleSize: new FormControl(null, [Validators.required, Validators.min(1)]),
    blockWidth: new FormControl(null, [Validators.required, Validators.min(1)]),
    blockHeight: new FormControl(null, [Validators.required, Validators.min(1)]),
  });
  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.puzzleForm.controls['puzzle'].valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe((change) => {
        const possiblePuzzleSize = Math.sqrt(change.trim().length);
        if (isInteger(possiblePuzzleSize)) {
          this.puzzleForm.controls['puzzleSize'].patchValue(possiblePuzzleSize);
        } else {
          this.puzzleForm.controls['puzzleSize'].patchValue(null);
        }
      });

    this.puzzleForm.controls['puzzleSize'].valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe((change) => {
        const possibleBlockSize = Math.sqrt(toInteger(change));
        if (isInteger(possibleBlockSize)) {
          this.puzzleForm.controls['blockWidth'].patchValue(possibleBlockSize);
          this.puzzleForm.controls['blockHeight'].patchValue(possibleBlockSize);
        } else {
          this.puzzleForm.controls['blockWidth'].patchValue(null);
          this.puzzleForm.controls['blockHeight'].patchValue(null);
        }
      });
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  protected onValidSubmit(): void {
    this.sudokuService.setSize(this.puzzleForm.value.puzzleSize);
    this.sudokuService.setBlockWidth(this.puzzleForm.value.blockWidth);
    this.sudokuService.setBlockHeight(this.puzzleForm.value.blockHeight);
    this.sudokuService.setHorizontalBlockCount(this.puzzleForm.value.puzzleSize / this.puzzleForm.value.blockWidth);
    this.sudokuService.setVerticalBlockCount(this.puzzleForm.value.puzzleSize / this.puzzleForm.value.blockHeight);
    this.sudokuService.setPuzzle(this.puzzleForm.value.puzzle);
    this.router.navigateByUrl('').then();
  }
}

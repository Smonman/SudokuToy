import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SudokuService } from '../sudoku/services/sudoku.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { FormBase } from '../../shared/classes/form-base';

@Component({
  selector: 'app-puzzle-loader',
  templateUrl: './puzzle-loader.component.html',
  styleUrls: ['./puzzle-loader.component.css'],
})
export class PuzzleLoaderComponent extends FormBase implements OnInit, OnDestroy {

  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      puzzle: new FormControl('', [Validators.pattern('[\\.0123456789 ]*')]),
      puzzleSize: new FormControl(null, [Validators.required, Validators.min(2)]),
      blockWidth: new FormControl(null, [Validators.required, Validators.min(1)]),
      blockHeight: new FormControl(null, [Validators.required, Validators.min(1)]),
    });

    this.form.controls['puzzle'].valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe((change) => {
        const possiblePuzzleSize = Math.sqrt(change.trim().length);
        if (Number.isInteger(possiblePuzzleSize)) {
          this.form.controls['puzzleSize'].patchValue(possiblePuzzleSize);
        } else {
          this.form.controls['puzzleSize'].patchValue(null);
        }
      });

    this.form.controls['puzzleSize'].valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe((change) => {
        const possibleBlockSize = Math.sqrt(Number(change));
        if (Number.isInteger(possibleBlockSize)) {
          this.form.controls['blockWidth'].patchValue(possibleBlockSize);
          this.form.controls['blockHeight'].patchValue(possibleBlockSize);
        } else {
          this.form.controls['blockWidth'].patchValue(null);
          this.form.controls['blockHeight'].patchValue(null);
        }
      });
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  protected onValidSubmit(formValue: any): void {
    this.sudokuService.setSize(formValue.puzzleSize);
    this.sudokuService.setBlockWidth(formValue.blockWidth);
    this.sudokuService.setBlockHeight(formValue.blockHeight);
    this.sudokuService.setHorizontalBlockCount(formValue.puzzleSize / formValue.blockWidth);
    this.sudokuService.setVerticalBlockCount(formValue.puzzleSize / formValue.blockHeight);
    this.sudokuService.setPuzzle(formValue.puzzle);
    this.router.navigateByUrl('').then();
  }
}

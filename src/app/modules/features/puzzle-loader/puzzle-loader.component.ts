import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
      puzzle: new FormControl<string | null>('', [
        Validators.pattern('[\\.0123456789 ]*'),
      ]),
      puzzleSize: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(2),
      ]),
      boxWidth: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(1),
      ]),
      boxHeight: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(1),
      ]),
    }, {
      validators: [
        validateMaxBoxSize('puzzleSize', 'boxWidth'),
        validateMaxBoxSize('puzzleSize', 'boxHeight'),
        validateDivisibleBoxSize('puzzleSize', 'boxWidth'),
        validateDivisibleBoxSize('puzzleSize', 'boxHeight'),
        validateSizeMatch('puzzle', 'puzzleSize'),
      ],
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
        const possibleBoxSize = Math.sqrt(Number(change));
        if (Number.isInteger(possibleBoxSize)) {
          this.form.controls['boxWidth'].patchValue(possibleBoxSize);
          this.form.controls['boxHeight'].patchValue(possibleBoxSize);
        } else {
          this.form.controls['boxWidth'].patchValue(null);
          this.form.controls['boxHeight'].patchValue(null);
        }
      });
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  protected onValidSubmit(formValue: any): void {
    this.sudokuService.setSize(formValue.puzzleSize);
    this.sudokuService.setBoxWidth(formValue.boxWidth);
    this.sudokuService.setBoxHeight(formValue.boxHeight);
    this.sudokuService.setHorizontalBoxCount(formValue.puzzleSize / formValue.boxWidth);
    this.sudokuService.setVerticalBoxCount(formValue.puzzleSize / formValue.boxHeight);
    this.sudokuService.setPuzzle(formValue.puzzle);
    this.router.navigateByUrl('').then();
  }
}

export function validateDivisibleBoxSize(puzzleSizeControlName: string, boxSizeControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;
    const size = Number(form.get(puzzleSizeControlName)?.value);
    const boxSize = Number(form.get(boxSizeControlName)?.value);
    if (Number.isInteger(size / boxSize)) {
      return null;
    } else {
      if (boxSize > 0 && boxSize <= size) {
        form.get(boxSizeControlName)?.setErrors({validateDivisibleBoxSize: {valid: false}});
        return {validateDivisibleBoxSize: {valid: false, controlName: boxSizeControlName}};
      } else {
        return null;
      }
    }
  };
}

export function validateMaxBoxSize(puzzleSizeControlName: string, boxSizeControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;
    const size = Number(form.get(puzzleSizeControlName)?.value);
    const boxSize = Number(form.get(boxSizeControlName)?.value);
    if (size >= boxSize) {
      return null;
    } else {
      form.get(boxSizeControlName)?.setErrors({validateMaxBoxSize: {valid: false}});
      return {validateMaxBoxSize: {valid: false, controlName: boxSizeControlName}};
    }
  };
}

export function validateSizeMatch(puzzleControlName: string, puzzleSizeControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;
    const puzzle = form.get(puzzleControlName)?.value;
    const size = Number(form.get(puzzleSizeControlName)?.value);
    if (puzzle) {
      if (puzzle.length === 0 || puzzle.length === size * size) {
        return null;
      } else {
        form.get(puzzleSizeControlName)?.setErrors({validateSizeMatch: {valid: false}});
        return {validateSizeMatch: {valid: false, controlName: puzzleSizeControlName}};
      }
    } else {
      return null;
    }
  };
}

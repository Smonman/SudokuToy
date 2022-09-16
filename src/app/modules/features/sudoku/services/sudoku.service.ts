import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { InputMode } from '../../../shared/classes/input-mode';
import { ValueMode } from '../classes/value-mode';
import { CornerMode } from '../classes/corner-mode';
import { CenterMode } from '../classes/center-mode';
import { TimerService } from '../../timer/services/timer.service';

@Injectable({
  providedIn: 'root',
})
export class SudokuService implements OnDestroy {
  private size = new BehaviorSubject<number>(9);
  private verticalBoxCount = new BehaviorSubject<number>(3);
  private horizontalBoxCount = new BehaviorSubject<number>(3);
  private boxWidth = new BehaviorSubject<number>(3);
  private boxHeight = new BehaviorSubject<number>(3);
  private selectedCellIds = new BehaviorSubject<number[]>([]);
  private highlightedCellIds = new BehaviorSubject<number[]>([]);
  private puzzle = new BehaviorSubject<string | null>(null);
  private clearCells = new Subject<void>();
  private cellIds: number[] = [];
  private inputModes = new BehaviorSubject<InputMode[]>([]);
  private curInputMode = new BehaviorSubject<InputMode | null>(null);
  private curInputModeIndex = new BehaviorSubject<number>(0);
  private finished = new Subject<void>();
  private userInput = new Subject<any>();
  private $destroy = new Subject<void>();

  constructor(private timerService: TimerService) {
    this.$inputModes
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => this.curInputMode.next(this.getInputModes()[this.getCurInputModeIndex()]));

    this.$size
      .pipe(takeUntil(this.$destroy))
      .subscribe((size: number) => {
        this.inputModes.next([
          new ValueMode(size),
          new CornerMode(size),
          new CenterMode(size),
        ]);
      });

    this.$puzzle
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.timerService.stopTimer();
        this.timerService.resetTimer();
        this.timerService.startTimer();
      });

    this.$finished
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.timerService.stopTimer();
        this.setSelectedCellIds([]);
        this.setHighlightedCellIds([]);
      });

    this.$userInput
      .pipe(takeUntil(this.$destroy))
      .subscribe((data: any) => {
        if (data.index === 0) this.checkIfFinished();
        if (this.timerService.getIsPaused()) this.timerService.startTimer();
      });
  }

  get $size(): Observable<number> {
    return this.size.asObservable();
  }

  get $verticalBoxCount(): Observable<number> {
    return this.verticalBoxCount.asObservable();
  }

  get $horizontalBoxCount(): Observable<number> {
    return this.horizontalBoxCount.asObservable();
  }

  get $boxWidth(): Observable<number> {
    return this.boxWidth.asObservable();
  }

  get $boxHeight(): Observable<number> {
    return this.boxHeight.asObservable();
  }

  get $selectedCellIds(): Observable<number[]> {
    return this.selectedCellIds.asObservable();
  }

  get $puzzle(): Observable<string | null> {
    return this.puzzle.asObservable();
  }

  get $clearCells(): Observable<void> {
    return this.clearCells.asObservable();
  }

  get $highlightedCellIds(): Observable<number[]> {
    return this.highlightedCellIds.asObservable();
  }

  get $curInputModeIndex(): Observable<number> {
    return this.curInputModeIndex.asObservable();
  }

  get $curInputMode(): Observable<InputMode | null> {
    return this.curInputMode.asObservable();
  }

  get $inputModes(): Observable<InputMode[]> {
    return this.inputModes.asObservable();
  }

  get $finished(): Observable<void> {
    return this.finished.asObservable();
  }

  get $userInput(): Observable<number> {
    return this.userInput.asObservable();
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  getSize(): number {
    return this.size.getValue();
  }

  getVerticalBoxCount(): number {
    return this.verticalBoxCount.getValue();
  }

  getHorizontalBoxCount(): number {
    return this.horizontalBoxCount.getValue();
  }

  getBoxWidth(): number {
    return this.boxWidth.getValue();
  }

  getBoxHeight(): number {
    return this.boxHeight.getValue();
  }

  getCurInputModeIndex(): number {
    return this.curInputModeIndex.getValue();
  }

  getInputModes(): InputMode[] {
    return this.inputModes.getValue();
  }

  setSize(value: number): void {
    this.size.next(value);
  }

  setVerticalBoxCount(value: number): void {
    this.verticalBoxCount.next(value);
  }

  setHorizontalBoxCount(value: number): void {
    this.horizontalBoxCount.next(value);
  }

  setBoxWidth(value: number): void {
    this.boxWidth.next(value);
  }

  setBoxHeight(value: number): void {
    this.boxHeight.next(value);
  }

  setSelectedCellIds(cellIds: number[]): void {
    this.cellIds = cellIds;
    this.selectedCellIds.next(this.cellIds);
  }

  setPuzzle(puzzle: string): void {
    this.setClearCells();
    this.setSelectedCellIds([]);
    this.setHighlightedCellIds([]);
    this.puzzle.next(puzzle);
  }

  setClearCells(): void {
    this.clearCells.next();
  }

  setHighlightedCellIds(cellIds: number[]): void {
    this.highlightedCellIds.next(cellIds);
  }

  switchInput(): void {
    this.setCurInputModeIndex((this.getCurInputModeIndex() + 1) % this.getInputModes().length);
    this.curInputMode.next(this.getInputModes()[this.getCurInputModeIndex()]);
  }

  writeToInputMode(index: number, id: number, value: number | number[] | null) {
    this.getInputModes()[index].updateValue(id, value);
    this.userInput.next({index: index, id: id, value: value});
  }

  setCurInputModeIndex(index: number): void {
    this.curInputModeIndex.next(index);
    this.curInputMode.next(this.getInputModes()[index]);
  }

  computeCellId(row: number, col: number): number {
    return row * this.getSize() + col;
  }

  computeBoxId(row: number, col: number): number {
    return Math.floor(row / this.getBoxHeight()) * this.getHorizontalBoxCount() + Math.floor(col / this.getBoxWidth());
  }

  updateSelectedCellId(id: number): void {
    if (this.cellIds.includes(id)) {
      this.cellIds = this.cellIds.filter((e: number) => e !== id);
    } else {
      this.cellIds.push(id);
    }
    this.selectedCellIds.next(this.cellIds);
  }

  checkIfFinished(): void {
    const temp = this.getInputModes()[0].value;
    for (const e of temp) {
      if (e === null) return;
    }
    this.finished.next();
  }
}

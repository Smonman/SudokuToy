import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import { InputMode } from "../../../shared/classes/input-mode";
import { ValueMode } from "../classes/value-mode";
import { CornerMode } from "../classes/corner-mode";
import { CenterMode } from "../classes/center-mode";
import { TimerService } from "../../timer/services/timer.service";

@Injectable({
  providedIn: 'root'
})
export class SudokuService implements OnDestroy {
  private size = new BehaviorSubject<number>(9);
  private verticalBlockCount = new BehaviorSubject<number>(3);
  private horizontalBlockCount = new BehaviorSubject<number>(3);
  private blockWidth = new BehaviorSubject<number>(3);
  private blockHeight = new BehaviorSubject<number>(3);
  private selectedCellIds = new BehaviorSubject<number[]>([]);
  private highlightedCellIds = new BehaviorSubject<number[]>([]);
  private puzzle = new BehaviorSubject<string | null>(null);
  private clearCells = new Subject<void>();
  private cellIds: number[] = [];
  private inputModes = new BehaviorSubject<InputMode[]>([]);
  private curInputMode = new BehaviorSubject<InputMode | null>(null);
  private curInputModeIndex = new BehaviorSubject<number>(0);
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
          new CenterMode(size)
        ]);
      });

    this.$puzzle
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.timerService.startTimer();
      });
  }

  get $size(): Observable<number> {
    return this.size.asObservable();
  }

  get $verticalBlockCount(): Observable<number> {
    return this.verticalBlockCount.asObservable();
  }

  get $horizontalBlockCount(): Observable<number> {
    return this.horizontalBlockCount.asObservable();
  }

  get $blockWidth(): Observable<number> {
    return this.blockWidth.asObservable();
  }

  get $blockHeight(): Observable<number> {
    return this.blockHeight.asObservable();
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

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  getSize(): number {
    return this.size.getValue();
  }

  getVerticalBlockCount(): number {
    return this.verticalBlockCount.getValue();
  }

  getHorizontalBlockCount(): number {
    return this.horizontalBlockCount.getValue();
  }

  getBlockWidth(): number {
    return this.blockWidth.getValue();
  }

  getBlockHeight(): number {
    return this.blockHeight.getValue();
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

  setVerticalBlockCount(value: number): void {
    this.verticalBlockCount.next(value);
  }

  setHorizontalBlockCount(value: number): void {
    this.horizontalBlockCount.next(value);
  }

  setBlockWidth(value: number): void {
    this.blockWidth.next(value);
  }

  setBlockHeight(value: number): void {
    this.blockHeight.next(value);
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
  }

  setCurInputModeIndex(index: number): void {
    this.curInputModeIndex.next(index);
  }

  computeCellId(row: number, col: number): number {
    return row * this.getSize() + col;
  }

  computeBlockId(row: number, col: number): number {
    return Math.floor(row / this.getBlockHeight()) * this.getHorizontalBlockCount() + Math.floor(col / this.getBlockWidth());
  }

  updateSelectedCellId(id: number): void {
    if (this.cellIds.includes(id)) {
      this.cellIds = this.cellIds.filter((e: number) => e !== id);
    } else {
      this.cellIds.push(id);
    }
    this.selectedCellIds.next(this.cellIds);
  }
}

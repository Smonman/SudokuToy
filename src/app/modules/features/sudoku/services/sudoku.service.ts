import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  private size = new BehaviorSubject<number>(0);
  private verticalBlockCount = new BehaviorSubject<number>(0);
  private horizontalBlockCount = new BehaviorSubject<number>(0);
  private blockWidth = new BehaviorSubject<number>(0);
  private blockHeight = new BehaviorSubject<number>(0);
  private selectedCellIds = new BehaviorSubject<number[]>([]);
  private highlightedCellIds = new BehaviorSubject<number[]>([]);
  private puzzle = new BehaviorSubject<string | null>(null);
  private clearCells = new Subject<void>();
  private cellIds: number[] = [];
  private curInputModeIndex = new BehaviorSubject(0);
  private inputModeCount = 0;

  constructor() {
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

  getCurInputIndex(): number {
    return this.curInputModeIndex.getValue();
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
    this.setCurInputModeIndex((this.getCurInputIndex() + 1) % this.inputModeCount);
  }

  setCurInputModeIndex(index: number): void {
    this.curInputModeIndex.next(index);
  }

  setInputModeCount(value: number): void {
    this.inputModeCount = value;
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

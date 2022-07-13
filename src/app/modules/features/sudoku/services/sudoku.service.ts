import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  private size = new BehaviorSubject<number | null>(null);
  private verticalBlockCount = new BehaviorSubject<number | null>(null);
  private horizontalBlockCount = new BehaviorSubject<number | null>(null);
  private blockWidth = new BehaviorSubject<number | null>(null);
  private blockHeight = new BehaviorSubject<number | null>(null);
  private selectedCellIds = new BehaviorSubject<number[]>([]);
  private highlightedCellIds = new BehaviorSubject<number[]>([]);
  private puzzle = new BehaviorSubject<string | null>(null);
  private clearCells = new Subject<void>();
  private cellIds: number[] = [];

  constructor() {
  }

  get $size(): Observable<number | null> {
    return this.size.asObservable();
  }

  get $verticalBlockCount(): Observable<number | null> {
    return this.verticalBlockCount.asObservable();
  }

  get $horizontalBlockCount(): Observable<number | null> {
    return this.horizontalBlockCount.asObservable();
  }

  get $blockWidth(): Observable<number | null> {
    return this.blockWidth.asObservable();
  }

  get $blockHeight(): Observable<number | null> {
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

  setSize(value: number | null): void {
    this.size.next(value);
  }

  setVerticalBlockCount(value: number | null): void {
    this.verticalBlockCount.next(value);
  }

  setHorizontalBlockCount(value: number | null): void {
    this.horizontalBlockCount.next(value);
  }

  setBlockWidth(value: number | null): void {
    this.blockWidth.next(value);
  }

  setBlockHeight(value: number | null): void {
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

  updateSelectedCellId(id: number): void {
    if (this.cellIds.includes(id)) {
      this.cellIds = this.cellIds.filter((e: number) => e !== id);
    } else {
      this.cellIds.push(id);
    }
    this.selectedCellIds.next(this.cellIds);
  }
}

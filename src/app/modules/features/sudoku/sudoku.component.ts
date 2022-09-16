import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SudokuService } from './services/sudoku.service';
import { Subject, takeUntil } from 'rxjs';
import { InputMode } from '../../shared/classes/input-mode';
import { TimerService } from '../timer/services/timer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss'],
})
export class SudokuComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('finishedModal') finishedModal: TemplateRef<any> | null = null;

  public size: number = 0;
  public boxWidth: number = 0;
  public boxHeight: number = 0;
  public verticalBoxCount: number = 0;
  public horizontalBoxCount: number = 0;
  public curInputMode: InputMode | null = null;
  public curInputModeIndex: number = 0;

  private $destroy = new Subject<void>();

  constructor(private sudokuService: SudokuService, private timerService: TimerService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.sudokuService.$size
      .pipe(takeUntil(this.$destroy))
      .subscribe((size: number) => this.size = size);

    this.sudokuService.$boxWidth
      .pipe(takeUntil(this.$destroy))
      .subscribe((boxWidth: number) => this.boxWidth = boxWidth);

    this.sudokuService.$boxHeight
      .pipe(takeUntil(this.$destroy))
      .subscribe((boxHeight: number) => this.boxHeight = boxHeight);

    this.sudokuService.$verticalBoxCount
      .pipe(takeUntil(this.$destroy))
      .subscribe((verticalBoxCount: number) => this.verticalBoxCount = verticalBoxCount);

    this.sudokuService.$horizontalBoxCount
      .pipe(takeUntil(this.$destroy))
      .subscribe((horizontalBoxCount: number) => this.horizontalBoxCount = horizontalBoxCount);

    this.sudokuService.$curInputModeIndex
      .pipe(takeUntil(this.$destroy))
      .subscribe((index: number) => this.curInputModeIndex = index);

    this.sudokuService.$curInputMode
      .pipe(takeUntil(this.$destroy))
      .subscribe((im: InputMode | null) => this.curInputMode = im);
  }

  ngAfterViewInit(): void {
    this.sudokuService.$finished
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.openModal(this.finishedModal);
      });
  }

  @HostListener('window:keyup', ['$event'])
  clearSelection(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.sudokuService.setSelectedCellIds([]);
      this.sudokuService.setHighlightedCellIds([]);
    } else if (e.key === 'Tab' || e.key === ' ') {
      this.sudokuService.switchInput();
    }
  }

  getFinishedTime(): number {
    return this.timerService.getCurrentTime();
  }

  openModal(modal: any): void {
    if (!this.modalService.hasOpenModals() && modal) {
      this.modalService.open(modal, {centered: true, scrollable: true, modalDialogClass: 'modal-content-rounded'});
    }
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

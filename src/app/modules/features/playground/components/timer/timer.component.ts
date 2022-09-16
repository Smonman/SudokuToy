import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy, AfterViewChecked {

  public isRunning: boolean = false;
  public isPaused: boolean = false;
  public isStopped: boolean = false;
  public curTime: number = 0;
  private $destroy = new Subject<void>();

  constructor(private timerService: TimerService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.timerService.$tick
      .pipe(takeUntil(this.$destroy))
      .subscribe((curTime: number) => {
        this.curTime = curTime;
      });

    this.timerService.$isPaused
      .pipe(takeUntil(this.$destroy))
      .subscribe((isPaused: boolean) => {
        this.isPaused = isPaused;
      });

    this.timerService.$isStopped
      .pipe(takeUntil(this.$destroy))
      .subscribe((isStopped: boolean) => {
        this.isStopped = isStopped;
      });

    this.timerService.$isRunning
      .pipe(takeUntil(this.$destroy))
      .subscribe((isRunning: boolean) => {
        this.isRunning = isRunning;
      });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  start() {
    this.timerService.startTimer();
  }

  pause() {
    this.timerService.pauseTimer();
  }

  stop() {
    this.timerService.stopTimer();
  }

  reset() {
    this.timerService.resetTimer();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

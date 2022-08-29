import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from "./services/timer.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  public isRunning: boolean = false;
  public isPaused: boolean = false;
  public isStopped: boolean = false;
  public curTime: number = 0;
  private $destroy = new Subject<void>();
  private intervalId: number = -1;

  constructor(private timerService: TimerService) {
  }

  ngOnInit(): void {
    this.timerService.$start
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.intervalId = window.setInterval(() => {
          this.curTime += 1;
        }, 1000);
      });

    this.timerService.$pause
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        window.clearInterval(this.intervalId);
      });

    this.timerService.$stop
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        window.clearInterval(this.intervalId);
      });

    this.timerService.$reset
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.curTime = 0;
      });

    this.timerService.$isRunning
      .pipe(takeUntil(this.$destroy))
      .subscribe((isRunning: boolean) => {
        this.isRunning = isRunning;
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

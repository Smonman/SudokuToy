import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from './services/timer.service';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {

  public isRunning: boolean = false;
  public isPaused: boolean = false;
  public isStopped: boolean = false;
  public curTime: number = 0;
  private $destroy = new Subject<void>();
  private intervalTimer = interval(1000);
  private subscription: Subscription = new Subscription();

  constructor(private timerService: TimerService) {
  }

  ngOnInit(): void {

    // the order of these subscriptions is important

    this.timerService.$pause
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.subscription.unsubscribe();
      });

    this.timerService.$stop
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.subscription.unsubscribe();
      });

    this.timerService.$reset
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.curTime = 0;
      });

    this.timerService.$start
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.subscription = this.intervalTimer
          .pipe(takeUntil(this.$destroy))
          .subscribe(() => {
            this.curTime += 1;
          });
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

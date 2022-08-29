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
  public curTime: number = 0;
  private $destroy = new Subject<void>();
  private intervalId: number = -1;

  constructor(private timerService: TimerService) {
  }

  ngOnInit(): void {
    this.timerService.$start
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.start();
      });

    this.timerService.$pause
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => this.pause());

    this.timerService.$stop
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => this.stop());

    this.timerService.$reset
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => this.reset());

    this.timerService.$isRunning
      .pipe(takeUntil(this.$destroy))
      .subscribe((isRunning: boolean) => this.isRunning = isRunning);

    this.timerService.$isPaused
      .pipe(takeUntil(this.$destroy))
      .subscribe((isPaused: boolean) => this.isPaused = isPaused);
  }

  start() {
    this.intervalId = window.setInterval(() => {
      this.curTime += 1;
    }, 1000);
  }

  pause() {
    window.clearInterval(this.intervalId);
  }

  stop() {
    window.clearInterval(this.intervalId);
  }

  reset() {
    this.curTime = 0;
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

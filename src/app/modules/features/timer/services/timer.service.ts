import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Observable, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService implements OnDestroy {

  private tick = new BehaviorSubject<number>(0);
  private start = new ReplaySubject<void>(1);
  private pause = new ReplaySubject<void>(1);
  private stop = new ReplaySubject<void>(1);
  private reset = new ReplaySubject<void>(1);
  private isRunning = new BehaviorSubject<boolean>(false);
  private isPaused = new BehaviorSubject<boolean>(false);
  private isStopped = new BehaviorSubject<boolean>(false);
  private curTime: number = 0;
  private intervalTimer = interval(1000);
  private subscription: Subscription = new Subscription();
  private $destroy = new Subject<void>();

  constructor() {
  }

  get $tick(): Observable<number> {
    return this.tick.asObservable();
  }

  get $start(): Observable<void> {
    return this.start.asObservable();
  }

  get $pause(): Observable<void> {
    return this.pause.asObservable();
  }

  get $stop(): Observable<void> {
    return this.stop.asObservable();
  }

  get $reset(): Observable<void> {
    return this.reset.asObservable();
  }

  get $isRunning(): Observable<boolean> {
    return this.isRunning.asObservable();
  }

  get $isPaused(): Observable<boolean> {
    return this.isPaused.asObservable();
  }

  get $isStopped(): Observable<boolean> {
    return this.isStopped.asObservable();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  startTimer() {
    this.subscription = this.intervalTimer
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.curTime += 1;
        this.tick.next(this.curTime);
      });
    this.start.next();
    this.isRunning.next(true);
    this.isPaused.next(false);
    this.isStopped.next(false);
  }

  pauseTimer() {
    this.subscription.unsubscribe();
    this.pause.next();
    this.isRunning.next(false);
    this.isPaused.next(true);
    this.isStopped.next(false);
  }

  stopTimer() {
    this.subscription.unsubscribe();
    this.stop.next();
    this.isRunning.next(false);
    this.isPaused.next(false);
    this.isStopped.next(true);
  }

  resetTimer() {
    this.curTime = 0;
    this.tick.next(this.curTime);
    this.reset.next();
    this.isPaused.next(false);
    this.isStopped.next(false);
  }

  getCurrentTime(): number {
    return this.curTime;
  }
}

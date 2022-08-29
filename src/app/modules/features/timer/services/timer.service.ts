import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private start = new ReplaySubject<void>();
  private pause = new ReplaySubject<void>();
  private stop = new ReplaySubject<void>();
  private reset = new ReplaySubject<void>();
  private isRunning = new BehaviorSubject<boolean>(false);
  private isPaused = new BehaviorSubject<boolean>(false);
  private isStopped = new BehaviorSubject<boolean>(false);

  constructor() {
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

  startTimer() {
    this.start.next();
    this.isRunning.next(true);
    this.isPaused.next(false);
    this.isStopped.next(false);
  }

  pauseTimer() {
    this.pause.next();
    this.isRunning.next(false);
    this.isPaused.next(true);
    this.isStopped.next(false);
  }

  stopTimer() {
    this.stop.next();
    this.isRunning.next(false);
    this.isPaused.next(false);
    this.isStopped.next(true);
  }

  resetTimer() {
    this.reset.next();
    this.isPaused.next(false);
    this.isStopped.next(false);
  }
}

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecondsPipe } from './pipes/seconds.pipe';

const sharedImports = [
  HttpClientTestingModule,
  RouterTestingModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [SecondsPipe],
  imports: [...sharedImports],
  exports: [...sharedImports, SecondsPipe],
})
export class SharedTestingModule {
}

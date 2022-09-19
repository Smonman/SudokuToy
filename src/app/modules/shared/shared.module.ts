import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { SecondsPipe } from './pipes/seconds.pipe';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { FormErrorComponent } from './components/form-errors/form-error/form-error.component';
import {
  backspace,
  exclamationDiamond,
  github,
  heartFill,
  NgxBootstrapIconsModule,
  questionCircle,
} from 'ngx-bootstrap-icons';
import { ReactiveButtonComponent } from './components/reactive-button/reactive-button.component';
import { HelpButtonComponent } from './components/help-button/help-button.component';

const icons = {
  heartFill,
  github,
  questionCircle,
  exclamationDiamond,
  backspace,
};

const sharedDeclarations = [
  PageLayoutComponent,
  SecondsPipe,
  FormErrorsComponent,
  FormErrorComponent,
  ReactiveButtonComponent,
  HelpButtonComponent,
];

const sharedImports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgxBootstrapIconsModule,
];

@NgModule({
  declarations: [...sharedDeclarations],
  imports: [...sharedImports, NgxBootstrapIconsModule.pick(icons)],
  exports: [...sharedImports, ...sharedDeclarations],
})
export class SharedModule {
}

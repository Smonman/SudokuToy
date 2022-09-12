import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { SecondsPipe } from './pipes/seconds.pipe';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { FormErrorComponent } from './components/form-errors/form-error/form-error.component';
import { exclamationDiamond, github, heartFill, NgxBootstrapIconsModule, questionCircle } from 'ngx-bootstrap-icons';

const icons = {
  heartFill,
  github,
  questionCircle,
  exclamationDiamond,
};

const sharedDeclarations = [
  PageLayoutComponent,
  SecondsPipe,
  FormErrorsComponent,
  FormErrorComponent,
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

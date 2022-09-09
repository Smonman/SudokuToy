import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { SecondsPipe } from './pipes/seconds.pipe';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { FormErrorComponent } from './components/form-errors/form-error/form-error.component';

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
];

@NgModule({
  declarations: [...sharedDeclarations],
  imports: [...sharedImports],
  exports: [...sharedImports, ...sharedDeclarations],
})
export class SharedModule {
}

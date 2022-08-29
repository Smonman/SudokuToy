import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { SecondsPipe } from './pipes/seconds.pipe';

const sharedDeclarations = [
  PageLayoutComponent,
  SecondsPipe
]

const sharedImports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];

@NgModule({
  declarations: [...sharedDeclarations],
  imports: [...sharedImports],
  exports: [...sharedImports, ...sharedDeclarations]
})
export class SharedModule {
}

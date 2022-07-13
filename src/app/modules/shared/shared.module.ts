import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const sharedImports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];

@NgModule({
  declarations: [],
  imports: [...sharedImports],
  exports: [...sharedImports]
})
export class SharedModule {
}

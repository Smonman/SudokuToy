import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuzzleLoaderComponent } from './puzzle-loader.component';

const routes: Routes = [
  {
    path: '',
    component: PuzzleLoaderComponent,
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuzzleLoaderRoutingModule {
}

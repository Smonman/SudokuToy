import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/features/playground/playground.module').then(
        (m) => m.PlaygroundModule
      )
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./modules/features/puzzle-loader/puzzle-loader.module').then(
        (m) => m.PuzzleLoaderModule
      )
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

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
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

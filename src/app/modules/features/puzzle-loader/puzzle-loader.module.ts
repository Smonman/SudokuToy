import { NgModule } from '@angular/core';
import { PuzzleLoaderComponent } from "./puzzle-loader.component";
import { SharedModule } from "../../shared/shared.module";
import { PuzzleLoaderRoutingModule } from "./puzzle-loader-routing.module";

@NgModule({
  declarations: [PuzzleLoaderComponent],
  imports: [SharedModule, PuzzleLoaderRoutingModule]
})
export class PuzzleLoaderModule {
}

import { NgModule } from '@angular/core';
import { PlaygroundComponent } from "./playground.component";
import { SharedModule } from "../../shared/shared.module";
import { PlaygroundRoutingModule } from "./playground-routing.module";
import { SudokuModule } from "../sudoku/sudoku.module";

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [SharedModule, PlaygroundRoutingModule, SudokuModule]
})
export class PlaygroundModule {
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

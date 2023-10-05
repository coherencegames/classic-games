import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacmanModule } from './pacman/pacman.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PacmanModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

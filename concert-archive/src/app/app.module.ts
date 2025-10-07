import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component'; // standalone -> import
import { AlbumsPageComponent } from './albums-page/albums-page.component'; // non-standalone -> declare
import { DiscographyPageComponent } from './discography-page/discography-page.component'; // non-standalone -> declare
import { AppRoutingModule } from './app-routing.module';
import { ConcertService } from './services/concert.service';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsPageComponent,
    DiscographyPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HomePageComponent,
    AppRoutingModule
  ],
  providers: [ConcertService],
  bootstrap: [AppComponent]
})
export class AppModule {}

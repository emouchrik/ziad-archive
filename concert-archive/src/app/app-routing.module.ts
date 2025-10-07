import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsPageComponent } from './albums-page/albums-page.component';
import { DiscographyPageComponent } from './discography-page/discography-page.component';
import { HomePageComponent } from './home-page/home-page.component';

// Default route added to prevent router NoMatchError when the app starts at '/'.

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'albums', component: AlbumsPageComponent },
  { path: 'discography', component: DiscographyPageComponent },
  // wildcard fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
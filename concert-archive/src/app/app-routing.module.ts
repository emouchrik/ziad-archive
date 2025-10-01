import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsPageComponent } from './albums-page/albums-page.component';

const routes: Routes = [
  // ...existing routes...
  { path: 'albums', component: AlbumsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Bootstrap the NgModule so AppRoutingModule and declared components are loaded.
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

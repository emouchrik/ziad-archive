import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Firebase SDK (analytics)
// Only initialize analytics in a browser environment
try {
  if (typeof window !== 'undefined') {
    // Import the Firebase functions dynamically so they don't run in SSR or non-browser envs
    // Note: dynamic import is supported by modern bundlers used with Angular CLI.
    import('firebase/app').then(({ initializeApp }) => {
      // Use the compat-free modular SDK path for analytics
      import('firebase/analytics').then(({ getAnalytics }) => {
        const firebaseConfig = {
          apiKey: "AIzaSyBl_HoOKLDSVbOgHxLXtMUS869GrybHuFw",
          authDomain: "ziad-archive.firebaseapp.com",
          projectId: "ziad-archive",
          storageBucket: "ziad-archive.firebasestorage.app",
          messagingSenderId: "70946064039",
          appId: "1:70946064039:web:6da68bb37ed14c07cbfd82",
          measurementId: "G-RW7MB4VRTW"
        };

        try {
          const app = initializeApp(firebaseConfig as any);
          // Initialize analytics (will noop if not supported)
          try { getAnalytics(app); } catch (e) { /* analytics unavailable in some envs */ }
        } catch (e) {
          // initialization error should not block the app
          // tslint:disable-next-line:no-console
          console.warn('Firebase init error', e);
        }
      });
    });
  }
} catch (e) {
  // keep bootstrap resilient
  // tslint:disable-next-line:no-console
  console.warn('Could not initialize Firebase (non-browser environment?)', e);
}

// Bootstrap the NgModule so AppRoutingModule and declared components are loaded.
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

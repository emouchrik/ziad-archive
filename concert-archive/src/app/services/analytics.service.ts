import { Injectable } from '@angular/core';

/**
 * Lightweight wrapper to log Firebase Analytics events.
 * Uses dynamic imports so it doesn't break SSR or environments without window.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor() {}

  logEvent(name: string, params?: Record<string, any>) {
    if (typeof window === 'undefined') return;
    // dynamic import to avoid module resolution issues in non-browser builds
    import('firebase/analytics')
      .then(({ getAnalytics, logEvent }) => {
        try {
          const analytics = getAnalytics();
          logEvent(analytics, name, params || {});
        } catch (e) {
          // ignore analytics errors
          // console.debug('Analytics logEvent error', e);
        }
      })
      .catch(() => {
        // ignore import failures
      });
  }
}

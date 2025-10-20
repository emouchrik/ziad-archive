import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ConcertService, Concert, Song } from '../services/concert.service';
import { IframeWrapperComponent } from '../shared/iframe-wrapper/iframe-wrapper.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatButtonModule, MatListModule, RouterModule, IframeWrapperComponent]
})
export class HomePageComponent {
  concerts: Concert[];

  // single player state (dock only)
  currentSong: Song | null = null;
  // dock embed URL (iframe src) and playing flag
  dockEmbedUrl: string | null = null;
  dockPlaying = false;
  // last raw embed string used for the dock
  private lastDockEmbed: string | null = null;

  constructor(private concertService: ConcertService) {
    this.concerts = this.concertService.getConcerts();
  }

  // popup, resize and drag removed — dock-only player

  // small helper to show concise titles
  shortTitle(title: string, max = 42): string {
    if (!title) return '';
    return title.length > max ? title.slice(0, max - 3) + '...' : title;
  }

  // Generic embed URL builder: supports Vimeo and YouTube (with start time parsing)
  private getEmbedUrl(url: string): string {
    if (!url) return url;

    // Vimeo (numeric id)
    const vmatch = url.match(/vimeo\.com\/(\d+)/);
    if (vmatch) {
      const id = vmatch[1];
      // preserve any #t=... fragment if present
      const hashMatch = url.match(/#t=(.*)$/);
      const hash = hashMatch ? `#t=${hashMatch[1]}` : '';
      return `https://player.vimeo.com/video/${id}?autoplay=1${hash}`;
    }

    // YouTube (watch?v=, youtu.be/, embed/)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let id = '';
      // Try common patterns
      const re1 = url.match(/(?:v=|\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/);
      if (re1) id = re1[1];

      // fallback: try to parse search param v
      try {
        const u = new URL(url);
        if (!id) id = u.searchParams.get('v') || '';
        // prefer hash or query t/start params for start time
        let start = 0;
        const tParam = u.searchParams.get('t') || u.searchParams.get('start') || '';
        if (tParam) start = this.parseTimeToSeconds(tParam);
        const hash = u.hash ? u.hash.replace(/^#/, '') : '';
        if (!start && hash) {
          // hash can be like t=1m30s or 1m30s
          const hm = hash.match(/t=(.*)/);
          start = this.parseTimeToSeconds(hm ? hm[1] : hash);
        }

        if (!id && u.hostname.includes('youtu.be')) {
          // path begins with /{id}
          id = u.pathname.replace(/^\//, '');
        }

        if (id) {
          const startQuery = start ? `?start=${start}&autoplay=1` : '?autoplay=1';
          return `https://www.youtube.com/embed/${id}${startQuery}`;
        }
      } catch (e) {
        // ignore URL parse errors and fallthrough
      }
    }

    // no special handling, return original URL
    return url;
  }

  private parseTimeToSeconds(input: string): number {
    if (!input) return 0;
    input = input.trim();
    // plain seconds
    if (/^\d+$/.test(input)) return parseInt(input, 10);
    // formats like 1m30s, 2h3m4s
    let total = 0;
    const h = input.match(/(\d+)h/);
    const m = input.match(/(\d+)m/);
    const s = input.match(/(\d+)s/);
    if (h) total += parseInt(h[1], 10) * 3600;
    if (m) total += parseInt(m[1], 10) * 60;
    if (s) total += parseInt(s[1], 10);
    // fallback for mm:ss or hh:mm:ss
    if (total === 0 && input.includes(':')) {
      const parts = input.split(':').map(p => parseInt(p, 10) || 0);
      if (parts.length === 2) total = parts[0] * 60 + parts[1];
      else if (parts.length === 3) total = parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return total;
  }

  ngOnDestroy(): void {
    // ensure we remove any listeners (dock-related)
    this.stopDock();
  }

  // open dock (audio-first) when clicking a song
  openDockPlayer(song: { title: string; url?: string }) {
    // Show dock audio
    this.currentSong = song as Song;
    if (!song.url) {
      this.setEmbedFor('dock', null);
      return;
    }
    const embed = this.getEmbedUrl(song.url);
    this.setEmbedFor('dock', embed);
  }

  // Universal song click handler: play in dock
  playSong(song: { title: string; url?: string }) {
    this.currentSong = song as Song;
    // destroy any existing dock player and then set new embed
    this.stopDock();
    if (!song.url) {
      this.setEmbedFor('dock', null);
      return;
    }
    const embed = this.getEmbedUrl(song.url);
    this.setEmbedFor('dock', embed);
  }

  toggleDockPlay() {
    // simple toggle by removing/adding iframe src
    if (this.dockPlaying) {
      this.setEmbedFor('dock', null);
    } else if (this.currentSong && this.currentSong.url) {
      const embed = this.getEmbedUrl(this.currentSong.url);
      this.setEmbedFor('dock', embed);
    }
  }

  closeDock() {
    this.dockEmbedUrl = null;
    this.dockPlaying = false;
    this.currentSong = null;
    // full-popup removed
  }

  stopDock() {
    this.dockEmbedUrl = null;
    this.dockPlaying = false;
  }

  // open the large video popup from the dock
  // popup video removed; dock-only player

  // Helper to set embed URLs for popup or dock. We track the raw embed string
  // so we can detect when two different song entries map to the same iframe URL
  // (e.g. two timestamps in the same video). Instead of temporarily clearing
  // the iframe src (which can be brittle), we append a short nonce query
  // parameter to the embed URL when the new embed equals the previous one.
  // This makes the URL distinct and forces the browser to reload the iframe.
  private setEmbedFor(target: 'dock', embed: string | null) {
    const addReloadNonce = (url: string) => {
      // insert the nonce before any hash (#) so fragments (like Vimeo #t=) remain
      const hashIndex = url.indexOf('#');
      const base = hashIndex === -1 ? url : url.slice(0, hashIndex);
      const hash = hashIndex === -1 ? '' : url.slice(hashIndex);
      const sep = base.includes('?') ? '&' : '?';
      return `${base}${sep}r=${Date.now()}${hash}`;
    };

    if (!embed) {
      this.dockEmbedUrl = null;
      this.dockPlaying = false;
      this.lastDockEmbed = null;
      return;
    }
    const prev = this.lastDockEmbed;
    const finalEmbed = embed === prev ? addReloadNonce(embed) : embed;
    this.dockEmbedUrl = finalEmbed;
    this.lastDockEmbed = embed;
    this.dockPlaying = true;
  }

  // Drag/resize/movable-popup code removed (dock-only)

  // return a flat array of songs for a concert (concatenate chapters)
  getAllSongs(concert: Concert) {
    if (!concert || !concert.chapters) return [];
    return concert.chapters.reduce((acc: Song[], ch) => {
      if (ch && Array.isArray(ch.songs)) {
        return acc.concat(ch.songs as Song[]);
      }
      return acc;
    }, [] as Song[]);
  }
}

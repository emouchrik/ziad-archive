import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ConcertService, Concert, Song } from '../services/concert.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatButtonModule, MatListModule, RouterModule]
})
export class HomePageComponent {
  concerts: Concert[];

  // player sizing (px)
  playerWidth = 380;
  playerHeight = 360;
  private cornerResizing = false;
  private cornerStartX = 0;
  private cornerStartY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private readonly minPlayerWidth = 260;
  private readonly minPlayerHeight = 160;
  private readonly maxPlayerWidth = 1200;
  private readonly maxPlayerHeight = 1000;

  // single player state
  currentSong: Song | null = null;
  currentEmbedUrl: SafeResourceUrl | null = null;

  // collapsed dock state (when true the player appears as a small bottom-right dock)
  isCollapsed = false;

  constructor(private concertService: ConcertService, private sanitizer: DomSanitizer) {
    this.concerts = this.concertService.getConcerts();
  }

  openPlayer(song: { title: string; url?: string }) {
    this.currentSong = song as Song;
    this.isCollapsed = false; // open expanded by default
    if (!song.url) {
      this.currentEmbedUrl = null;
      return;
    }
    const embed = this.getEmbedUrl(song.url);
    this.currentEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }

  closePlayer() {
    this.currentSong = null;
    this.currentEmbedUrl = null;
    this.isCollapsed = false;
  }

  collapsePlayer() {
    this.isCollapsed = true;
  }

  expandPlayer() {
    this.isCollapsed = false;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  // corner resize handlers
  startCornerResize(evt: MouseEvent) {
    evt.preventDefault();
    this.cornerResizing = true;
    this.cornerStartX = evt.clientX;
    this.cornerStartY = evt.clientY;
    this.startWidth = this.playerWidth;
    this.startHeight = this.playerHeight;
    document.addEventListener('mousemove', this.onCornerMove);
    document.addEventListener('mouseup', this.stopCornerResize);
  }

  private onCornerMove = (e: MouseEvent) => {
    if (!this.cornerResizing) return;
    const dx = this.cornerStartX - e.clientX; // dragging left increases width
    const dy = e.clientY - this.cornerStartY; // dragging down increases height
    let newWidth = this.startWidth + dx;
    let newHeight = this.startHeight + dy;
    newWidth = Math.max(this.minPlayerWidth, Math.min(this.maxPlayerWidth, newWidth));
    newHeight = Math.max(this.minPlayerHeight, Math.min(this.maxPlayerHeight, newHeight));
    this.playerWidth = newWidth;
    this.playerHeight = newHeight;
  };

  private stopCornerResize = (_e?: MouseEvent) => {
    if (!this.cornerResizing) return;
    this.cornerResizing = false;
    document.removeEventListener('mousemove', this.onCornerMove);
    document.removeEventListener('mouseup', this.stopCornerResize);
  };

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
    // ensure we remove any listeners
    this.stopCornerResize();
  }

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

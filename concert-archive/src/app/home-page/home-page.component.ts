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
  private cornerMode: 'tl' | 'tr' | 'bl' | 'br' = 'br';
  private readonly minPlayerWidth = 260;
  private readonly minPlayerHeight = 160;
  private readonly maxPlayerWidth = 1200;
  private readonly maxPlayerHeight = 1000;

  // single player state
  currentSong: Song | null = null;
  currentEmbedUrl: SafeResourceUrl | null = null;

  // Audio-only dock state
  dockEmbedUrl: SafeResourceUrl | null = null;
  dockPlaying = false;
  showVideoPopup = false; // only open video popup when user requests it

  // collapsed dock state (when true the player appears as a small bottom-right dock)
  isCollapsed = false;
  // movable player state
  playerLeft: number | null = null; // if null, use right instead
  playerTop = 20;
  playerRight = 16; // default right offset when not moved
  private dragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartLeft = 0;
  private dragStartTop = 0;

  constructor(private concertService: ConcertService, private sanitizer: DomSanitizer) {
    this.concerts = this.concertService.getConcerts();
  }

  openPlayer(song: { title: string; url?: string }) {
    // Stop dock audio when opening the full video popup
    this.stopDock();
    this.currentSong = song as Song;
    this.isCollapsed = false; // open expanded by default
    this.showVideoPopup = true;
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
    // smooth expand: ensure the element remains present and animate via CSS
    this.isCollapsed = false;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  // corner resize handlers
  startCornerResize(evt: MouseEvent, mode: 'tl' | 'tr' | 'bl' | 'br') {
    this.startCornerResizeGeneric(evt.clientX, evt.clientY, mode);
    evt.preventDefault();
  }

  startCornerResizeTouch(evt: TouchEvent, mode: 'tl' | 'tr' | 'bl' | 'br') {
    if (!evt.touches || evt.touches.length === 0) return;
    const t = evt.touches[0];
    this.startCornerResizeGeneric(t.clientX, t.clientY, mode);
    evt.preventDefault();
  }

  private startCornerResizeGeneric(clientX: number, clientY: number, mode: 'tl' | 'tr' | 'bl' | 'br') {
    this.cornerResizing = true;
    this.cornerStartX = clientX;
    this.cornerStartY = clientY;
    this.startWidth = this.playerWidth;
    this.startHeight = this.playerHeight;
    this.cornerMode = mode;
    // record current left/top for adjustments when resizing from left/top corners
    this.dragStartLeft = this.playerLeft === null ? window.innerWidth - this.playerWidth - (this.playerRight || 0) : this.playerLeft;
    this.dragStartTop = this.playerTop || 0;
    document.addEventListener('mousemove', this.onCornerMove);
  document.addEventListener('mouseup', this.stopCornerResize);
  // also listen for pointerup and pointercancel (better cross-platform) and window blur
  document.addEventListener('pointerup', this.stopCornerResize, true);
  document.addEventListener('pointercancel', this.stopCornerResize, true);
  window.addEventListener('blur', this.stopCornerResize);
    document.addEventListener('touchmove', this.onCornerTouchMove, { passive: false });
    document.addEventListener('touchend', this.stopCornerResize);
  }

  private onCornerMove = (e: MouseEvent) => {
    if (!this.cornerResizing) return;
    this.handleResize(e.clientX, e.clientY);
  };

  private onCornerTouchMove = (e: TouchEvent) => {
    if (!this.cornerResizing || !e.touches || e.touches.length === 0) return;
    e.preventDefault();
    const t = e.touches[0];
    this.handleResize(t.clientX, t.clientY);
  };

  private handleResize(clientX: number, clientY: number) {
    const dx = clientX - this.cornerStartX;
    const dy = clientY - this.cornerStartY;
    let newWidth = this.startWidth;
    let newHeight = this.startHeight;
    let newLeft = this.dragStartLeft;
    let newTop = this.dragStartTop;

    switch (this.cornerMode) {
      case 'br':
        newWidth = this.startWidth + dx;
        newHeight = this.startHeight + dy;
        break;
      case 'bl':
        newWidth = this.startWidth - dx;
        newHeight = this.startHeight + dy;
        newLeft = this.dragStartLeft + dx; // shift left edge
        break;
      case 'tr':
        newWidth = this.startWidth + dx;
        newHeight = this.startHeight - dy;
        newTop = this.dragStartTop + dy; // shift top edge
        break;
      case 'tl':
        newWidth = this.startWidth - dx;
        newHeight = this.startHeight - dy;
        newLeft = this.dragStartLeft + dx;
        newTop = this.dragStartTop + dy;
        break;
    }

    // clamp sizes
    newWidth = Math.max(this.minPlayerWidth, Math.min(this.maxPlayerWidth, Math.round(newWidth)));
    newHeight = Math.max(this.minPlayerHeight, Math.min(this.maxPlayerHeight, Math.round(newHeight)));

    // clamp positions so the player remains visible
    newLeft = Math.max(8, Math.min(window.innerWidth - newWidth - 8, Math.round(newLeft)));
    newTop = Math.max(8, Math.min(window.innerHeight - 80 - newHeight, Math.round(newTop)));

    this.playerWidth = newWidth;
    this.playerHeight = newHeight;
    this.playerLeft = newLeft;
    this.playerTop = newTop;
    // clear playerRight to prioritize left-based positioning
    this.playerRight = 0;
  }

  private stopCornerResize = (_e?: MouseEvent) => {
    if (!this.cornerResizing) return;
    this.cornerResizing = false;
    document.removeEventListener('mousemove', this.onCornerMove);
    document.removeEventListener('mouseup', this.stopCornerResize);
    document.removeEventListener('pointerup', this.stopCornerResize, true);
    document.removeEventListener('pointercancel', this.stopCornerResize, true);
    window.removeEventListener('blur', this.stopCornerResize);
    document.removeEventListener('touchmove', this.onCornerTouchMove as EventListener);
    document.removeEventListener('touchend', this.stopCornerResize);
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
    this.stopDrag();
    this.stopDock();
  }

  // open dock (audio-first) when clicking a song
  openDockPlayer(song: { title: string; url?: string }) {
    // Minimize any full popup and show dock audio
    this.currentSong = song as Song;
    this.showVideoPopup = false;
    this.currentEmbedUrl = null;
    if (!song.url) {
      this.dockEmbedUrl = null;
      this.dockPlaying = false;
      return;
    }
    const embed = this.getEmbedUrl(song.url);
    this.dockEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
    this.dockPlaying = true;
  }

  // Universal song click handler: update whichever player is currently visible
  playSong(song: { title: string; url?: string }) {
    this.currentSong = song as Song;
    // if the video popup is open, update it
    if (this.showVideoPopup) {
      // ensure dock is stopped
      this.stopDock();
      if (!song.url) {
        this.currentEmbedUrl = null;
        return;
      }
      const embed = this.getEmbedUrl(song.url);
      this.currentEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
      this.isCollapsed = false;
      return;
    }

    // otherwise update the dock (start or replace playback)
    this.currentEmbedUrl = null;
    this.showVideoPopup = false;
    // destroy any existing dock player and then set new embed
    this.stopDock();
    if (!song.url) {
      this.dockEmbedUrl = null;
      this.dockPlaying = false;
      return;
    }
    const embed = this.getEmbedUrl(song.url);
    this.dockEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
    this.dockPlaying = true;
  }

  toggleDockPlay() {
    // simple toggle by removing/adding iframe src
    if (this.dockPlaying) {
      this.dockEmbedUrl = null;
      this.dockPlaying = false;
    } else if (this.currentSong && this.currentSong.url) {
      const embed = this.getEmbedUrl(this.currentSong.url);
      this.dockEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
      this.dockPlaying = true;
    }
  }

  closeDock() {
    this.dockEmbedUrl = null;
    this.dockPlaying = false;
    this.currentSong = null;
    this.showVideoPopup = false;
  }

  stopDock() {
    this.dockEmbedUrl = null;
    this.dockPlaying = false;
  }

  // open the large video popup from the dock
  openVideoFromDock() {
    if (!this.currentSong) return;
    // stop dock to avoid double audio
    this.stopDock();
    this.showVideoPopup = true;
    if (!this.currentSong.url) {
      this.currentEmbedUrl = null;
      return;
    }
    const embed = this.getEmbedUrl(this.currentSong.url);
    this.currentEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
    this.isCollapsed = false;
  }

  // minimize the full popup back to the dock (audio-only)
  minimizeToDock() {
    if (!this.currentSong) return;
    const url = this.currentSong.url;
    this.showVideoPopup = false;
    this.currentEmbedUrl = null;
    if (!url) return;
    const embed = this.getEmbedUrl(url);
    this.dockEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
    this.dockPlaying = true;
  }

  // close the video popup and ensure dock is stopped
  closeVideoPopup() {
    this.showVideoPopup = false;
    this.currentEmbedUrl = null;
    this.stopDock();
  }

  // Drag-to-move handlers (for header dragging)
  startDrag(evt: MouseEvent) {
    // only start drag for left click
    if (evt.button !== 0) return;
    evt.preventDefault();
    this.dragging = true;
    this.dragStartX = evt.clientX;
    this.dragStartY = evt.clientY;
    // initialize left/top from current state; if left is null, compute from right
    if (this.playerLeft === null) {
      this.dragStartLeft = window.innerWidth - this.playerWidth - (this.playerRight || 0);
    } else {
      this.dragStartLeft = this.playerLeft;
    }
    this.dragStartTop = this.playerTop || 0;
    document.addEventListener('mousemove', this.onDragMove);
    document.addEventListener('mouseup', this.stopDrag);
    document.addEventListener('pointerup', this.stopDrag, true);
    document.addEventListener('pointercancel', this.stopDrag, true);
    window.addEventListener('blur', this.stopDrag);
  }

  startDragTouch(evt: TouchEvent) {
    if (!evt.touches || evt.touches.length === 0) return;
    const t = evt.touches[0];
    this.dragging = true;
    this.dragStartX = t.clientX;
    this.dragStartY = t.clientY;
    if (this.playerLeft === null) {
      this.dragStartLeft = window.innerWidth - this.playerWidth - (this.playerRight || 0);
    } else {
      this.dragStartLeft = this.playerLeft;
    }
    this.dragStartTop = this.playerTop || 0;
    document.addEventListener('touchmove', this.onDragTouchMove, { passive: false });
    document.addEventListener('touchend', this.stopDrag);
    document.addEventListener('pointerup', this.stopDrag, true);
    document.addEventListener('pointercancel', this.stopDrag, true);
    window.addEventListener('blur', this.stopDrag);
  }

  private onDragMove = (e: MouseEvent) => {
    if (!this.dragging) return;
    const dx = e.clientX - this.dragStartX;
    const dy = e.clientY - this.dragStartY;
    let newLeft = this.dragStartLeft + dx;
    let newTop = this.dragStartTop + dy;
    // constrain to viewport
    newLeft = Math.max(8, Math.min(window.innerWidth - this.playerWidth - 8, newLeft));
    newTop = Math.max(8, Math.min(window.innerHeight - 80, newTop));
    this.playerLeft = Math.round(newLeft);
    this.playerTop = Math.round(newTop);
  };

  private onDragTouchMove = (e: TouchEvent) => {
    if (!this.dragging || !e.touches || e.touches.length === 0) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - this.dragStartX;
    const dy = t.clientY - this.dragStartY;
    let newLeft = this.dragStartLeft + dx;
    let newTop = this.dragStartTop + dy;
    newLeft = Math.max(8, Math.min(window.innerWidth - this.playerWidth - 8, newLeft));
    newTop = Math.max(8, Math.min(window.innerHeight - 80, newTop));
    this.playerLeft = Math.round(newLeft);
    this.playerTop = Math.round(newTop);
  };

  private stopDrag = (_e?: Event) => {
    if (!this.dragging) return;
    this.dragging = false;
    // when finished dragging, clear right offset so left/top take precedence
    this.playerRight = 0;
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup', this.stopDrag);
    document.removeEventListener('pointerup', this.stopDrag, true);
    document.removeEventListener('pointercancel', this.stopDrag, true);
    window.removeEventListener('blur', this.stopDrag);
    document.removeEventListener('touchmove', this.onDragTouchMove as EventListener);
    document.removeEventListener('touchend', this.stopDrag);
  };

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

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
    const embed = this.getVimeoEmbedUrl(song.url);
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

  private getVimeoEmbedUrl(url: string): string {
    const match = url.match(/vimeo\.com\/(\d+)(#t=.*)?/);
    if (!match) {
      return url;
    }
    const id = match[1];
    const hash = match[2] || '';
    return `https://player.vimeo.com/video/${id}?autoplay=1${hash}`;
  }

  ngOnDestroy(): void {
    // ensure we remove any listeners
    this.stopCornerResize();
  }
}

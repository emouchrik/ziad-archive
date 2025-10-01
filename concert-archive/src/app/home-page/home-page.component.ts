import { Component } from '@angular/core';
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
}

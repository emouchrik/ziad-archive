import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ConcertService, Concert } from '../services/concert.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatButtonModule, MatListModule]
})
export class HomePageComponent {
  concerts: Concert[];

  constructor(private concertService: ConcertService) {
    this.concerts = this.concertService.getConcerts();
  }

  playSong(song: { title: string; url?: string }) {
    // Placeholder: integrate a real audio player as needed
    console.log('Play song:', song.title, song.url || '(no url)');
    if (!song.url) return;
    // For Vimeo links (videos) open in a new tab at the timestamp anchor
    try {
      const url = song.url;
      // open in new tab
      window.open(url, '_blank');
    } catch (err) {
      console.error('Playback/open error', err);
    }
  }
}

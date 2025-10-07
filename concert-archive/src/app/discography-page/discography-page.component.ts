import { Component, OnInit } from '@angular/core';

interface Album {
  title: string;
  artist?: string;
  year?: string;
  coverUrl?: string;
  url?: string;
}

@Component({
  selector: 'app-discography-page',
  templateUrl: './discography-page.component.html',
  styleUrls: ['./discography-page.component.scss']
})
export class DiscographyPageComponent implements OnInit {
  discography: Album[] = [
    { title: 'Live at the Forum', artist: 'Ziad', year: '2023', coverUrl: '/assets/albums/cover1.jpg', url: '#' },
    { title: 'Acoustic Sessions', artist: 'Ziad', year: '2022', coverUrl: '/assets/albums/cover2.jpg', url: '#' },
    { title: 'Unplugged', artist: 'Ziad', year: '2021', coverUrl: '/assets/albums/cover3.jpg', url: '#' },
    { title: 'Greatest Hits', artist: 'Ziad', year: '2020', coverUrl: '/assets/albums/cover4.jpg', url: '#' }
  ];

  constructor() {}

  ngOnInit(): void {}

  openAlbum(a: Album) {
    if (a.url) {
      window.open(a.url, '_blank');
    }
  }
}
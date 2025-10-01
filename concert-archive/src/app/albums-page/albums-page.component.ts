import { Component, OnInit } from '@angular/core';

interface Album {
  title: string;
  artist?: string;
  year?: string;
  coverUrl: string;
  url?: string;
}

@Component({
  selector: 'app-albums-page',
  templateUrl: './albums-page.component.html',
  styleUrls: ['./albums-page.component.scss']
})
export class AlbumsPageComponent implements OnInit {
  albums: Album[] = [
    { title: 'Live at the Forum', artist: 'Ziad', year: '2023', coverUrl: '/assets/albums/cover1.jpg', url: '#' },
    { title: 'Acoustic Sessions', artist: 'Ziad', year: '2022', coverUrl: '/assets/albums/cover2.jpg', url: '#' },
    { title: 'Unplugged', artist: 'Ziad', year: '2021', coverUrl: '/assets/albums/cover3.jpg', url: '#' },
    { title: 'Greatest Hits', artist: 'Ziad', year: '2020', coverUrl: '/assets/albums/cover4.jpg', url: '#' },
    { title: 'Early Works', artist: 'Ziad', year: '2018', coverUrl: '/assets/albums/cover5.jpg', url: '#' },
    { title: 'Rare Tracks', artist: 'Ziad', year: '2016', coverUrl: '/assets/albums/cover6.jpg', url: '#' },
    { title: 'Studio Sessions', artist: 'Ziad', year: '2015', coverUrl: '/assets/albums/cover7.jpg', url: '#' },
    { title: 'The Concerts', artist: 'Ziad', year: '2014', coverUrl: '/assets/albums/cover8.jpg', url: '#' }
  ];

  constructor() {}

  ngOnInit(): void {}

  openAlbum(a: Album) {
    if (a.url) {
      window.open(a.url, '_blank');
    }
  }
}
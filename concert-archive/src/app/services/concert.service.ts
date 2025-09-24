import { Injectable } from '@angular/core';

export interface Song { title: string; duration?: string; url?: string }
export interface Chapter { title: string; songs: Song[] }
export interface Concert { title: string; date: string; chapters: Chapter[] }

@Injectable({ providedIn: 'root' })
export class ConcertService {
  getConcerts(): Concert[] {
    return [
      {
        title: 'Saida Concert',
        date: 'Unknown',
        chapters: [
          {
            title: 'chapter 1',
            songs: [
              { title: 'samadou w ghalabou', duration: '03:46', url: 'https://vimeo.com/328235786#t=3m46s' },
              { title: 'sobhi l jeez', duration: '07:00', url: 'https://vimeo.com/328235786#t=7m0s' },
              { title: 'ya saif', duration: '11:28', url: 'https://vimeo.com/328235786#t=11m28s' },
              { title: 'habb l hawa', duration: '15:12', url: 'https://vimeo.com/328235786#t=15m12s' },
              { title: 'overture 83', duration: '20:38', url: 'https://vimeo.com/328235786#t=20m38s' },
              { title: 'ma3loumat mish akidi', duration: '23:57', url: 'https://vimeo.com/328235786#t=23m57s' }
            ]
          },
          {
            title: 'chapter 2',
            songs: [
              { title: 'Shu Hal Iyyam', duration: '00:00', url: 'https://vimeo.com/328236158#t=0m0s' },
              { title: 'Ana 3indi Haneen', duration: '06:22', url: 'https://vimeo.com/328236158#t=6m22s' },
              { title: 'Bhalyawmen', duration: '17:27', url: 'https://vimeo.com/328236158#t=17m27s' },
              { title: 'Bima Enno', duration: '21:28', url: 'https://vimeo.com/328236158#t=21m28s' },
              { title: 'Atl W Darar', duration: '25:40', url: 'https://vimeo.com/328236158#t=25m40s' }
            ]
          },
          {
            title: 'chapter 3',
            songs: [
              { title: 'Al Amal', duration: '08:48', url: 'https://vimeo.com/328236587#t=8m48s' },
              { title: 'Nazl l Sorour', duration: '14:29', url: 'https://vimeo.com/328236587#t=14m29s' },
              { title: 'Habbaytak Ta Nsit Al Nom', duration: '16:50', url: 'https://vimeo.com/328236587#t=16m50s' },
              { title: 'The Song Goes On', duration: '23:07', url: 'https://vimeo.com/328236587#t=23m7s' }
            ]
          },
          {
            title: 'chapter 4',
            songs: [
              { title: 'Layk', duration: '00:00', url: 'https://vimeo.com/328235271#t=0m0s' },
              { title: 'Ya Jabal Al Sheikh', duration: '03:50', url: 'https://vimeo.com/328235271#t=3m50s' },
              { title: 'Sahraneen', duration: '07:17', url: 'https://vimeo.com/328235271#t=7m17s' },
              { title: 'Mais Al Rim intro', duration: '09:29', url: 'https://vimeo.com/328235271#t=9m29s' },
              { title: 'Talfan Ayyash', duration: '14:30', url: 'https://vimeo.com/328235271#t=14m30s' },
              { title: '3ataba', duration: '19:55', url: 'https://vimeo.com/328235271#t=19m55s' },
              { title: 'Ya bent Al Mo3awin', duration: '25:18', url: 'https://vimeo.com/328235271#t=25m18s' },
              { title: 'Amreeka Meen', duration: '29:18', url: 'https://vimeo.com/328235271#t=29m18s' }
            ]
          }
        ]
      },
      {
        title: 'Live at The Forum',
        date: '2022-05-14',
        chapters: [
          { title: 'Set 1', songs: [
            { title: 'Opening Song', duration: '4:12' },
            { title: 'Second Tune', duration: '5:03' }
          ]},
          { title: 'Set 2', songs: [
            { title: 'Slow Ballad', duration: '6:22' },
            { title: 'Encore', duration: '3:45' }
          ]}
        ]
      },
      {
        title: 'Acoustic Evening',
        date: '2021-11-02',
        chapters: [
          { title: 'Acoustic Set', songs: [
            { title: 'Quiet Intro', duration: '2:34' },
            { title: 'Story Song', duration: '4:50' }
          ]}
        ]
      }
    ];
  }
}

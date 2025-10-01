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
        date: 'October 27, 2018',
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

      // New: Arnoun Concert
      {
        title: 'Arnoun Concert',
        date: 'September 7, 2018',
        chapters: [
          {
            title: 'chapter 1',
            songs: [
              { title: 'مقدمة', duration: '00:00', url: 'https://vimeo.com/331233262#t=0m0s' },
              { title: 'بعتلك', duration: '09:37', url: 'https://vimeo.com/331233262#t=9m37s' },
              { title: 'أمنلي بيت', duration: '14:08', url: 'https://vimeo.com/331233262#t=14m8s' },
              { title: 'يعزونا', duration: '18:08', url: 'https://vimeo.com/331233262#t=18m8s' }
            ]
          },
          {
            title: 'chapter 2',
            songs: [
              { title: 'الأمل', duration: '01:56', url: 'https://vimeo.com/331234476#t=1m56s' },
              { title: 'صفحة جديدة', duration: '03:43', url: 'https://vimeo.com/331234476#t=3m43s' },
              { title: 'سهّرنا يا بو الأحباب', duration: '07:19', url: 'https://vimeo.com/331234476#t=7m19s' },
              { title: 'يا سيف على الأعداء طايل', duration: '09:23', url: 'https://vimeo.com/331234476#t=9m23s' },
              { title: 'مش بس تلفنلي', duration: '13:34', url: 'https://vimeo.com/331234476#t=13m34s' }
            ]
          },
          {
            title: 'chapter 3',
            songs: [
              { title: 'عهدير البوسطة', duration: '00:00', url: 'https://vimeo.com/331235667#t=0m0s' },
              { title: 'بيذكر بالخريف', duration: '06:09', url: 'https://vimeo.com/331235667#t=6m9s' },
              { title: 'عاتابا', duration: '10:59', url: 'https://vimeo.com/331235667#t=10m59s' },
              { title: 'يا بنت المعاون', duration: '20:04', url: 'https://vimeo.com/331235667#t=20m4s' }
            ]
          },
          {
            title: 'chapter 4',
            songs: [
              { title: 'Film Ameriki Tawil', duration: '00:00', url: 'https://vimeo.com/331237088#t=0m0s' },
              { title: 'Layk', duration: '06:24', url: 'https://vimeo.com/331237088#t=6m24s' },
              { title: 'Asaada Allah Masa2akum', duration: '11:58', url: 'https://vimeo.com/331237088#t=11m58s' },
              { title: 'Salimli 3ale', duration: '16:30', url: 'https://vimeo.com/331237088#t=16m30s' }
            ]
          },
          {
            title: 'chapter 5',
            songs: [
              { title: 'Talfayn Ayache', duration: '00:45', url: 'https://vimeo.com/331238275#t=0m45s' },
              { title: 'Bema Enno', duration: '04:50', url: 'https://vimeo.com/331238275#t=4m50s' },
              { title: 'Agua De Beber', duration: '08:51', url: 'https://vimeo.com/331238275#t=8m51s' },
              { title: 'Un Verre Chez Nous', duration: '11:55', url: 'https://vimeo.com/331238275#t=11m55s' },
              { title: 'Mays El Rim', duration: '15:41', url: 'https://vimeo.com/331238275#t=15m41s' }
            ]
          },
          {
            title: 'chapter 6',
            songs: [
              { title: 'المقاومة الوطنية', duration: '01:10', url: 'https://vimeo.com/331239381#t=1m10s' },
              { title: 'شو هالايام', duration: '04:27', url: 'https://vimeo.com/331239381#t=4m27s' },
              { title: 'صمدو و غلبو', duration: '08:59', url: 'https://vimeo.com/331239381#t=8m59s' },
              { title: 'Amreeka Meen', duration: '17:34', url: 'https://vimeo.com/331239381#t=17m34s' }
            ]
          }
        ]
      }
    ];
  }
}

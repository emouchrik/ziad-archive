import { Injectable } from '@angular/core';

export interface Song { title: string; duration?: string; url?: string; description?: string }
export interface Chapter { title: string; songs: Song[]; url?: string }
export interface Concert {
  title: string;
  date: string;
  chapters: Chapter[];
  description?: string;
  credits?: {
    musicians?: string[];
    singers?: string[];
    speakers?: string[];
  };
}

@Injectable({ providedIn: 'root' })
export class ConcertService {
  getConcerts(): Concert[] {
    return [
      {
        title: 'Provas & Singles Videos',
        date: '1985 - 2015',
        description: 'Collection of remastered proofs and single video clips',
        chapters: [
          {
            title: 'videos',
            songs: [
              { title: 'Drink (Remastered)', url: 'https://vimeo.com/338008441' },
              { title: 'Shi Fashel (Remastered)', url: 'https://vimeo.com/337989424' },
              { title: 'Film Ameriki Tawil - One Flew Over The Cuckoo\'s Nest', url: 'https://vimeo.com/333747708' },
              { title: 'Junkyard Mays El Rim Favorite', url: 'https://vimeo.com/332202467' },
              { title: 'Snatch Prova', url: 'https://vimeo.com/323532598' },
              { title: 'Ray Band Snatch', url: 'https://vimeo.com/323532306' },
              { title: 'Penalty Prova', url: 'https://vimeo.com/323532225' },
              { title: 'Bed in Studio', url: 'https://vimeo.com/323532004' },
              { title: 'Grand Prix Prova', url: 'https://vimeo.com/323532151' },
              { title: 'SoundTrack - The Kite (Le cerf Volant) - 2003', url: 'https://vimeo.com/319973574' },
              { title: 'Biaf - 2013', url: 'https://vimeo.com/318871882' },
              { title: 'Joe Sample - Tune Rough Mix (24/07/2018)', url: 'https://vimeo.com/318852796' },
              { title: 'Hudu\' Nisbi - 1985', url: 'https://vimeo.com/316599957' }
            ]
          }
        ]
      }
      ,
      {
        title: 'Teatro Concert',
        date: 'December 15, 2002',
        chapters: [
          {
            title: 'chapter 1',
            songs: [
              { title: 'Lullaby Birdland (George Shearing)', duration: '00:00', url: 'https://vimeo.com/327370274#t=0m0s' },
              { title: 'Mish bass talfinli', duration: '04:50', url: 'https://vimeo.com/327370274#t=4m50s' },
              { title: 'Ma tfill + Manha De Carnaval', duration: '08:20', url: 'https://vimeo.com/327370274#t=8m20s' },
              { title: 'Gingele Yele ... Gingele Yela', duration: '13:28', url: 'https://vimeo.com/327370274#t=13m28s' },
              { title: 'Mexicano (incredible piano solo)', duration: '15:50', url: 'https://vimeo.com/327370274#t=15m50s' },
              { title: 'Mas que Nada (Jorge Ben)', duration: '21:45', url: 'https://vimeo.com/327370274#t=21m45s' }
            ]
          },
          {
            title: 'chapter 2',
            songs: [
              { title: 'Autumn Leaves (Joseph Kosma)', duration: '00:00', url: 'https://vimeo.com/327372507#t=0m0s' },
              { title: 'De la Lune (FIXME)', duration: '05:00', url: 'https://vimeo.com/327372507#t=5m0s' },
              { title: 'Now is the Time (Charlie Parker)', duration: '07:26', url: 'https://vimeo.com/327372507#t=7m26s' },
              { title: 'Yardbird Suite (Charlie Parker)', duration: '15:50', url: 'https://vimeo.com/327372507#t=15m50s' }
            ]
          }
        ]
      }
      ,
      {
        title: 'St Elie Concert',
        date: 'May 2013',
        chapters: [
          {
            title: 'chapter 1',
            songs: [
              { title: 'Beiteddine Intro (2001)', duration: '06:06', url: 'https://youtu.be/vDiNbjCeVkI#t=6m6s' },
              { title: 'Kiriyalayson', duration: '10:02', url: 'https://youtu.be/vDiNbjCeVkI#t=10m2s' },
              { title: 'Al Majd Lak', duration: '14:28', url: 'https://youtu.be/vDiNbjCeVkI#t=14m28s' }
            ]
          },
          {
            title: 'chapter 2',
            songs: [
              { title: 'Al Majd Lak', duration: '00:00', url: 'https://youtu.be/hL-RdhSW4Vg#t=0m0s' },
              { title: 'Jisr Al Qamar', duration: '04:28', url: 'https://youtu.be/hL-RdhSW4Vg#t=4m28s' },
              { title: 'Allah Kbeer', duration: '07:46', url: 'https://youtu.be/hL-RdhSW4Vg#t=7m46s' },
              { title: 'Nahnu El Sahiroun', duration: '12:10', url: 'https://youtu.be/hL-RdhSW4Vg#t=12m10s' }
            ]
          },
          {
            title: 'chapter 3',
            songs: [
              { title: 'Nahnu El Sahiroun', duration: '00:00', url: 'https://youtu.be/0ga5HsLfpVI#t=0m0s' },
              { title: 'The Kite - Cerf Volant', duration: '02:30', url: 'https://youtu.be/0ga5HsLfpVI#t=2m30s' },
              { title: 'Al 3alam Ja2i3 - Samy Clark', duration: '04:30', url: 'https://youtu.be/0ga5HsLfpVI#t=4m30s' },
              { title: 'Sayyidi - Samy Clark', duration: '08:10', url: 'https://youtu.be/0ga5HsLfpVI#t=8m10s' }
            ]
          },
          {
            title: 'chapter 4',
            songs: [
              { title: 'Dakhilik Ya 2immi', duration: '00:42', url: 'https://youtu.be/COrIgFDPjd8#t=0m42s' },
              { title: 'Ya Mhayret el 3alali', duration: '03:43', url: 'https://youtu.be/COrIgFDPjd8#t=3m43s' },
              { title: '1987 Overture', duration: '08:25', url: 'https://youtu.be/COrIgFDPjd8#t=8m25s' },
              { title: 'Touba Lil Sa3een', duration: '10:24', url: 'https://youtu.be/COrIgFDPjd8#t=10m24s' }
            ]
          }
        ]
      }
      ,
      {
        title: 'Russian Cultural Center 2015',
        date: '2015',
        description: 'Live at the Russian Cultural Center — varied program with guest speakers and many guest musicians.',
        credits: {
          musicians: [
            'Sax - Elias M3allem',
            'Drums - April Centrone',
            'Percussions - Ayman Zibdawi',
            "Buzu2 - Raafat bou hamdan",
            'Keyboard - Darine Shhade',
            'Guitar - Adel Minkara',
            'Ousama Khatib - Bass',
            'Hany Siblini - keyboard',
            'Piano and keyboard - ziad rahbani'
          ],
          singers: [
            'Hala Masri',
            'Zeinab Zeinnedine',
            'Rabih Zaher',
            'Ramzi Khoury',
            'Barjhis Saliba',
            'Salim Lahham',
            'Ghada Ghanem'
          ],
          speakers: [
            'Rabih Zaher',
            'Lina Khoury',
            'Radwan Hamze',
            'Tareq Tamim',
            'Layal Daou'
          ]
        },
        chapters: [
          {
            title: 'chapter 1',
            url: 'https://vimeo.com/335712846',
            songs: [
              { title: 'Intro', duration: '00:00', url: 'https://vimeo.com/335712846#t=0m0s' },
              { title: 'Al Amal', duration: '04:32', url: 'https://vimeo.com/335712846#t=4m32s' },
              { title: 'Word by Sabah Ayyoub', duration: '07:10', url: 'https://vimeo.com/335712846#t=7m10s' },
              { title: 'Sobhi el Jeez', duration: '12:06', url: 'https://vimeo.com/335712846#t=12m6s' },
              { title: 'Al 3ors (The Wedding)', duration: '15:10', url: 'https://vimeo.com/335712846#t=15m7s', description: 'nice bouzo2 entrance' }
            ]
          },
          {
            title: 'chapter 2',
            url: 'https://vimeo.com/335713821',
            songs: [
              { title: 'Word by Lina Khoury (Hal Shi)', duration: '00:00', url: 'https://vimeo.com/335713821#t=0m0s' },
              { title: 'Ba3atillak Ya Habeeb el Rou7', duration: '03:06', url: 'https://vimeo.com/335713821#t=3m6s' },
              { title: 'Joe Sample Tune (with April Centrone on the Daff)', duration: '07:52', url: 'https://vimeo.com/335713821#t=7m52s' },
              { title: 'Word by Layal Daou and Radwan Hamze', duration: '14:30', url: 'https://vimeo.com/335713821#t=14m30s' },
              { title: 'Talfan Ayache', duration: '16:38', url: 'https://vimeo.com/335713821#t=16m38s' }
            ]
          },
          {
            title: 'chapter 3',
            url: 'https://vimeo.com/335714826',
            songs: [
              { title: 'Word by Tareq Tamim', duration: '00:00', url: 'https://vimeo.com/335714826#t=0m0s' },
              { title: 'Samadou Ghalabo', duration: '05:11', url: 'https://vimeo.com/335714826#t=5m11s' },
              { title: 'Asaada Allah Masaakum', duration: '10:23', url: 'https://vimeo.com/335714826#t=10m23s' },
              { title: 'Word by Lina Khoury', duration: '14:30', url: 'https://vimeo.com/335714826#t=14m30s' },
              { title: 'Sabah w Masa (Ghada Ghanem)', duration: '15:38', url: 'https://vimeo.com/335714826#t=15m38s' }
            ]
          },
          {
            title: 'chapter 4',
            url: 'https://vimeo.com/335715444',
            songs: [
              { title: 'Word by Radwan Hamze', duration: '00:00', url: 'https://vimeo.com/335715444#t=0m0s' },
              { title: 'Ya Nour Aaynaya', duration: '02:00', url: 'https://vimeo.com/335715444#t=2m0s' },
              { title: 'Ziad about El 7ali ti3bani ya layla', duration: '06:52', url: 'https://vimeo.com/335715444#t=6m52s' },
              { title: 'El 7ali ti3bani ya layla', duration: '09:35', url: 'https://vimeo.com/335715444#t=9m35s' },
              { title: 'Word by Layal Daou (Wijhit el iste3mel)', duration: '14:00', url: 'https://vimeo.com/335715444#t=14m0s' }
            ]
          },
          {
            title: 'chapter 5',
            url: 'https://vimeo.com/335715936',
            songs: [
              { title: 'Bizakker Bil Kharif', duration: '00:00', url: 'https://vimeo.com/335715936#t=0m0s' },
              { title: 'Word by Radwan Hamze and Tareq Tamim', duration: '05:38', url: 'https://vimeo.com/335715936#t=5m38s' },
              { title: '3ateba!', duration: '07:38', url: 'https://vimeo.com/335715936#t=7m38s' },
              { title: 'Ya Bint el m3awen', duration: '15:41', url: 'https://vimeo.com/335715936#t=15m41s' },
              { title: 'Credits', duration: '18:15', url: 'https://vimeo.com/335715936#t=18m15s' }
            ]
          }
        ]
      }
      ,
      {
        title: 'Publicity Concert 1',
        date: 'February 15, 2015',
        chapters: [
          {
            title: 'parts',
            songs: [
              { title: 'Publicity - 15-2-2015 part-1', url: 'https://vimeo.com/318059774' },
              { title: 'Publicity - 15-2-2015 part-2', url: 'https://vimeo.com/318060272' },
              { title: 'Publicity - 15-2-2015 part-3', url: 'https://vimeo.com/318314314' },
              { title: 'Publicity - 15-2-2015 part-4', url: 'https://vimeo.com/318060582' }
            ]
          }
        ]
      }
      ,
      {
        title: 'Publicity Concert 2',
        date: 'February 16, 2015',
        chapters: [
          {
            title: 'parts',
            songs: [
              { title: 'Publicity - 16-2-2015 part-1', url: 'https://vimeo.com/318065137' },
              { title: 'Publicity - 16-2-2015 part-2', url: 'https://vimeo.com/318064791' },
              { title: 'Publicity - 16-2-2015 part-3', url: 'https://vimeo.com/318064596' }
            ]
          }
        ]
      }
      ,
      {
        title: 'Zinc Concert',
        date: 'March 1, 2015',
        description: 'Packed with improvs on the keyboard and wind instruments',
        chapters: [
          {
            title: 'chapter 1',
            songs: [
              { title: 'Come Into My Life (Ziad Rifffffs)', duration: '00:00', url: 'https://vimeo.com/319978775#t=0m0s' },
              { title: 'My Little Suede Shoes (Charlie Parker)', duration: '04:49', url: 'https://vimeo.com/319978775#t=4m49s' }
            ]
          },
          {
            title: 'chapter 2',
            songs: [
              { title: 'Un Verre chez Nous', duration: '00:00', url: 'https://vimeo.com/319978482#t=0m0s', description: 'Ziad Says Nawaaal! Ya Nawaaaal; Two ladies (FIXME)' },
              { title: 'On Broadway', duration: '03:30', url: 'https://vimeo.com/319978482#t=3m30s' }
            ]
          }
        ]
      }
      ,
      {
        title: 'Blue Note',
        date: 'April 9, 2015',
        chapters: [
          { title: 'video', songs: [ { title: 'Blue Note - 9/4/2015', url: 'https://vimeo.com/320573330' } ] },
          { title: 'video', songs: [ { title: 'Blue Note - 18/5/2015', url: 'https://vimeo.com/325763780' } ] }
        ]
      }
      ,
      {
        title: 'Blue Note',
        date: 'May 18, 2015',
        chapters: [
          { title: 'video', songs: [ { title: 'Blue Note - 18/5/2015', url: 'https://vimeo.com/325763780' } ] }
        ]
      }
      ,
      {
        title: 'Arnoun Concert',
        date: 'September 7, 2018',
        description: 'A beautiful concert in Arnoun', 
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
      ,
      // Hrajel Concert — personnel/credits (informational only)
      // Mwaffak Zahabi - Cello
      // Rachid Hilal - Violin
      // Adnan Safar
      // Furat Hanana
      // Rafaat bou hamdan - bouzou2
      // Omran 3adra - Anoun
      // 3adel Minkara - Guitar
      // Elias el M3allem - Saxophone
      // Trumpet - Slava Bila & Nizar Omra
      // Trombone - Alex Chapez
      // Percussion - Ayman Zibdawi
      // drum - DANY SHUKRI
      // libnan aoun- accordio
      // khaled omran - bass
      // 3oud & singing - hazem chahine
      // singers & chorus: rabig zaher, noha zarrouf, rosy yaziji, na3ima yazbeck, hala masri, Marie-therese basil, Barjis saliba, Patrick Alpha, Salim Lahham, Gharadosk ALTANYAN
      // ACTORS: tareq tamim and rima kaddisi
      // sound engineers: wissam jarrah, ramzi zaydan, fadu awad, eddy jazra and ali mshawreb
      // conductor: hani siblini
      // piano & keyboard: ziad rahbani
      {
        title: 'Hrajel Concert',
        date: 'September 12, 2018',
        description: 'Massive Concert with rare dabke performed (Track #1)',
        chapters: [
          {
            title: 'chapter 1',
            songs: [
              { title: 'Dabke (only played once in 1982)', duration: '00:00', url: 'https://vimeo.com/333986913#t=0m0s' },
              { title: 'Baatilak', duration: '07:39', url: 'https://vimeo.com/333986913#t=7m39s' },
              { title: 'habb l hawa', duration: '11:27', url: 'https://vimeo.com/333986913#t=11m27s' },
              { title: 'يعزونا (nice piano introduction)', duration: '15:48', url: 'https://vimeo.com/333986913#t=15m48s' }
            ]
          },
          {
            title: 'chapter 2',
            songs: [
              { title: 'Tareq Tamim', duration: '00:00', url: 'https://vimeo.com/333988325#t=0m0s' },
              { title: 'Al Amal', duration: '03:01', url: 'https://vimeo.com/333988325#t=3m1s' },
              { title: 'Al 7ali Ti3bani ya Layla', duration: '05:32', url: 'https://vimeo.com/333988325#t=5m32s' },
              { title: 'Saf7a Gdida (Hazem Chahine)', duration: '09:50', url: 'https://vimeo.com/333988325#t=9m50s' },
              { title: 'يا سيف على الأعداء طايل', duration: '13:30', url: 'https://vimeo.com/333988325#t=13m30s' },
              { title: 'Mish bass Talfinli / Sa Dance se Samba', duration: '17:41', url: 'https://vimeo.com/333988325#t=17m41s' }
            ]
          },
          {
            title: 'chapter 3',
            songs: [
              { title: 'Rima Kaddisi', duration: '00:00', url: 'https://vimeo.com/333989563#t=0m0s' },
              { title: 'El Bosta', duration: '01:45', url: 'https://vimeo.com/333989563#t=1m45s' },
              { title: 'Bizakkarak (piano intro)', duration: '08:00', url: 'https://vimeo.com/333989563#t=8m0s' },
              { title: 'Ateba', duration: '13:00', url: 'https://vimeo.com/333989563#t=13m0s' },
              { title: 'bint el m3awen', duration: '22:39', url: 'https://vimeo.com/333989563#t=22m39s' }
            ]
          },
          {
            title: 'chapter 4',
            songs: [
              { title: 'Film Ameriki Tawil', duration: '00:00', url: 'https://vimeo.com/333991588#t=0m0s' },
              { title: 'Layk ya habibi layk', duration: '04:20', url: 'https://vimeo.com/333991588#t=4m20s' },
              { title: 'Tareq Tamim', duration: '07:45', url: 'https://vimeo.com/333991588#t=7m45s' },
              { title: 'Assaada Allah Masa2akum', duration: '09:24', url: 'https://vimeo.com/333991588#t=9m24s' },
              { title: 'Sallimli 3ale', duration: '13:25', url: 'https://vimeo.com/333991588#t=13m25s' },
              { title: 'Ismaa ya Rida', duration: '19:05', url: 'https://vimeo.com/333991588#t=19m5s' }
            ]
          },
          {
            title: 'chapter 5',
            songs: [
              { title: 'Rima Kaddisi', duration: '00:00', url: 'https://vimeo.com/333993432#t=0m0s' },
              { title: 'Talfan Ayache', duration: '01:41', url: 'https://vimeo.com/333993432#t=1m41s' },
              { title: 'Bema Enno', duration: '05:44', url: 'https://vimeo.com/333993432#t=5m44s' },
              { title: 'Para pada', duration: '09:45', url: 'https://vimeo.com/333993432#t=9m45s' },
              { title: 'Un Verre Chez Nous', duration: '13:26', url: 'https://vimeo.com/333993432#t=13m26s' },
              { title: 'Rima Kaddisi & Tareq Tamim', duration: '17:08', url: 'https://vimeo.com/333993432#t=17m8s' },
              { title: 'Mays El Reem', duration: '19:14', url: 'https://vimeo.com/333993432#t=19m14s' }
            ]
          },
          {
            title: 'chapter 6',
            songs: [
              { title: '3ayshi wa7da balak', duration: '00:00', url: 'https://vimeo.com/333985443#t=0m0s' },
              { title: 'LAWLA FOSHAT EL AMAL (piano as bass and longer intro + mistakes)', duration: '04:27', url: 'https://vimeo.com/333985443#t=4m27s' },
              { title: 'Shou Hal Iyyam', duration: '07:25', url: 'https://vimeo.com/333985443#t=7m25s' },
              { title: 'Credits', duration: '13:00', url: 'https://vimeo.com/333985443#t=13m0s' },
              { title: 'Amrika Meen - Lyrics readout', duration: '17:05', url: 'https://vimeo.com/333985443#t=17m5s' },
              { title: 'Amrika Meen', duration: '18:58', url: 'https://vimeo.com/333985443#t=18m58s' }
            ]
          }
        ]
      }
      ,
      {
        title: 'Saida Concert',
        date: 'October 27, 2018',
        description: 'A beautiful concert in Saida',
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
      }
    ];
  }
}

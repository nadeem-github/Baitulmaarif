import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-quran-mp3',
  templateUrl: './quran-mp3.component.html',
  styleUrls: ['./quran-mp3.component.scss']
})
export class QuranMp3Component implements OnInit {

  surahs: any[] = [];
  reciterId: number = 7; // Example ID, replace with actual reciter ID if necessary

  constructor(private quranService: ApisService) {}

  ngOnInit(): void {
    this.quranService.getSurahs().subscribe((data: any) => {
      this.surahs = data.suwar.map((surah: any) => ({
        id: surah.id,
        name: surah.name,
        audio: surah.audio,
      }));
    });
  }

}

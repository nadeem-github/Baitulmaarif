import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { QuranList } from 'src/app/modals/QuranMP3';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-quran-mp3',
  templateUrl: './quran-mp3.component.html',
  styleUrls: ['./quran-mp3.component.scss']
})
export class QuranMp3Component implements OnInit {

  QuranList: QuranList = new QuranList();
  surahs: any[] = [];

  constructor(private quranService: ApisService) {}

  ngOnInit(): void {
  }

  

}

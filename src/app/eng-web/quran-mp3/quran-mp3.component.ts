import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { QuranList } from 'src/app/modals/QuranMP3';
import { ApisService } from 'src/app/services/apis.service';

interface Surah {
  surahNumber: number;
  surahName: string;
  reader: string;
  audioUrl: string;
}

interface SurahResponse {
  surahs: Surah[];
}
@Component({
  selector: 'app-quran-mp3',
  templateUrl: './quran-mp3.component.html',
  styleUrls: ['./quran-mp3.component.scss']
})

export class QuranMp3Component implements OnInit {

  surahs: Surah[] = [];
  currentPage: number = 1;
  pageSize: number = 9;
  searchTerm: string = '';
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<SurahResponse>('assets/QuranAudioData.json').subscribe(
      (data: SurahResponse) => {
        this.surahs = data.surahs;
        this.loading = false;
        this.updatePageSize(window.innerWidth); // Set pageSize based on current window size
      },
      (error) => {
        console.error('Error loading surahs', error);
        this.errorMessage = 'Failed to load surah data. Please try again later.';
        this.loading = false;
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updatePageSize(event.target.innerWidth);
  }

  updatePageSize(width: number): void {
    this.pageSize = width <= 500 ? 5 : 9;
  }

  filteredSurahs(): Surah[] {
    if (!this.searchTerm) {
      return this.paginateSurahs(this.surahs);
    }
    const filtered = this.surahs.filter(surah =>
      surah.surahName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      surah.surahNumber.toString().includes(this.searchTerm)
    );
    return this.paginateSurahs(filtered);
  }

  paginateSurahs(surahs: Surah[]): Surah[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return surahs.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }



}

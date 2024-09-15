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
  selectedSheikh: string = 'Sheikh Mishary Rashid Alafasy';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSurahs(); // Load surahs initially
    this.updatePageSize(window.innerWidth); // Set pageSize based on current window size
  }

  // Method to load the Surahs based on the selected Sheikh
  loadSurahs(): void {
    this.loading = true;
    let jsonFile = '';

    switch (this.selectedSheikh) {
      case 'Sheikh Abdullah Basfar':
        jsonFile = 'assets/QuranAudioAbdullahbasfar.json';
        break;
      case 'Sheikh Bandar Baleelah':
        jsonFile = 'assets/QuranAudioBandarBalila.json';
        break;
      default:
        jsonFile = 'assets/QuranAudioAlafasy.json';
        break;
    }

    this.http.get<SurahResponse>(jsonFile).subscribe(
      (data: SurahResponse) => {
        this.surahs = data.surahs;
        this.loading = false;
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

  // Method to handle Sheikh selection change
  onSheikhChange(): void {
    this.loadSurahs(); // Reload surahs when the sheikh changes
  }



}

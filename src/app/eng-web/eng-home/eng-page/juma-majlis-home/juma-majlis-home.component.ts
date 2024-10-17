import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'juma-majlis-home',
  templateUrl: './juma-majlis-home.component.html',
  styleUrls: ['./juma-majlis-home.component.scss']
})
export class JumaMajlisHomeComponent implements OnInit {
  
  // ShortClipModal: ShortClipModal = new ShortClipModal();
  dataMolanaBayanList: any[] = [];
  page = 1;
  pageSize = 1;
  collectionSize = 0;
  loading = false;
  audioError = false;
  isAudioPlaying = false;
  baseUrl = 'http://apis.baitulmaarif.com/';

  ShortClipModal: any = {
    PageSize: this.pageSize,
    // Filter: 'Majalis Hazrat Wala (D.B.)'
    Filter: 'Juma Majlis'
  };

  constructor(private shortClipService: ApisService) {}

  ngOnInit(): void {
    this.getMolanaBayanList();
  }

  getMolanaBayanList(): void {
    this.loading = true;
    this.shortClipService.molanaBayanList(this.ShortClipModal).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.Status) {
          this.dataMolanaBayanList = response.Data;
          this.collectionSize = response.TotalCount;
        } else {
          console.warn('API response status is false');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching short clips:', error);
      }
    });
  }

  updateAudioState(isPlaying: boolean): void {
    this.isAudioPlaying = isPlaying;
  }

  shareBayan(bayan: any): void {
    const shareData = {
      title: bayan.Title,
      text: bayan.Description,
      url: this.baseUrl + bayan.Mp3Path
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) =>
        console.error('Error sharing bayan:', error)
      );
    } else {
      console.warn('Web Share API is not supported in this browser.');
      alert('Sharing is not supported in this browser.');
    }
  }

  handleAudioError(): void {
    this.audioError = true;
    console.error('Audio failed to load.');
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'islahi-bayan-home',
  templateUrl: './islahi-bayan-home.component.html',
  styleUrls: ['./islahi-bayan-home.component.scss']
})
export class IslahiBayanHomeComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataMolanaBayanList: any[] = [];
  page = 1;
  pageSize = 1;
  collectionSize = 0;
  selectedBayan: any;
  audioUrl: any;
  audioError: boolean = false;
  loading: boolean = false;
  isAudioPlaying = false;
  baseUrl = 'http://apis.baitulmaarif.com/';

  constructor(
    private shortClipService: ApisService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.setUpPayload();
    this.getMolanaBayanList();
  }

  setUpPayload() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.ShortClipModal.SortOrder = 'desc';
    this.ShortClipModal.PageSize = this.pageSize;

    // Always filter for "Hazrat Mufti Muhammad Arshad Sb. Bajhedi (D.B.)"
    this.ShortClipModal.Filter = 'Hazrat Mufti Muhammad Arshad Sb. Bajhedi (D.B.)';
    this.ShortClipModal.SortBy = '';
  }

  getMolanaBayanList() {
    this.loading = true; // Start loading before making the API call

    this.shortClipService.molanaBayanList(this.ShortClipModal).subscribe(
      (response: any) => {
        this.loading = false; // Stop loading when data is received
        if (response.Status) {
          // Sort data by 'UrUploadDate' in descending order to display the latest record at the top
          this.dataMolanaBayanList = response.Data.sort((a: any, b: any) => {
            return new Date(b.UploadDate).getTime() - new Date(a.UploadDate).getTime();
          });
          this.collectionSize = response.TotalCount;
          console.log('dataMolanaBayanList', this.dataMolanaBayanList);
          
        } else {
          console.warn('API response status is false');
        }
      },
      (error) => {
        this.loading = false; // Stop loading in case of error
        console.error('Error fetching short clips:', error);
      }
    );
  }

  onPageChange() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.getMolanaBayanList();
  }

  onPageSizeChange() {
    this.page = 1;
    this.setUpPayload();
    this.getMolanaBayanList();
  }

  downloadFile(mp3Path: string, title: string): void {
    const downloadUrl = `${this.baseUrl}${mp3Path}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = title;
    link.target = '_blank';
    link.click();
  }

  shareBayan(bayan: any): void {
    const shareData = {
      title: bayan.Title,
      text: bayan.Description,
      url: this.baseUrl + bayan.UrMp3Path
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        console.log('Bayan shared successfully');
      }).catch((error) => {
        console.error('Error sharing bayan:', error);
      });
    } else {
      console.warn('Web Share API is not supported in this browser.');
      alert('Sharing is not supported in this browser.');
    }
  }

  handleAudioError() {
    this.audioError = true; // Set the error flag to true if the audio fails to load
  }  

  updateAudioState(event: Event) {
    const audioElement = event.target as HTMLAudioElement;
    this.isAudioPlaying = !audioElement.paused;
  }

}

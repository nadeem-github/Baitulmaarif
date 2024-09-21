import { Component, OnInit } from '@angular/core';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'juma-bayaan-home-page',
  templateUrl: './juma-bayaan-home-page.component.html',
  styleUrls: ['./juma-bayaan-home-page.component.scss']
})
export class JumaBayaanHomePageComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataJumaByanList: any[] = [];
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
  ) { }

  ngOnInit(): void {
    this.setUpPayload();
    this.getJumaBayaan();
  }

  setUpPayload() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.ShortClipModal.SortOrder = 'desc';
    this.ShortClipModal.PageSize = this.pageSize;
  }

  getJumaBayaan() {
    this.loading = true; // Start loading before making the API call

    this.shortClipService.jumaBayaan(this.ShortClipModal).subscribe(
      (response: any) => {
        this.loading = false; // Stop loading when data is received
        if (response.Status) {
          // Sort data by 'UrUploadDate' in descending order to display the latest record at the top
          this.dataJumaByanList = response.Data.sort((a: any, b: any) => {
            return new Date(b.UploadDate).getTime() - new Date(a.UploadDate).getTime();
          });
          this.collectionSize = response.TotalCount;
          console.log('dataJumaByanList', this.dataJumaByanList);
          
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
    this.getJumaBayaan();
  }

  onPageSizeChange() {
    this.page = 1;
    this.setUpPayload();
    this.getJumaBayaan();
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

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

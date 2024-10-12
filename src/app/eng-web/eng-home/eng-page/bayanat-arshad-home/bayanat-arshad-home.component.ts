import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'bayanat-arshad-home',
  templateUrl: './bayanat-arshad-home.component.html',
  styleUrls: ['./bayanat-arshad-home.component.scss']
})
export class BayanatArshadHomeComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataMolanaBayanList: any[] = [];
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  selectedBayan: any;
  audioUrl: any;
  audioError: boolean = false;
  loading: boolean = false;

  constructor(
    private shortClipService: ApisService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.setUpPayload();
    this.getMolanaBayanList();
  }

  setUpPayload() {
    // this.ShortClipModal.PageIndexSize = this.page;
    // this.ShortClipModal.SortOrder = 'desc';
    // this.ShortClipModal.SortBy = 'Title';
    this.ShortClipModal.PageSize = this.pageSize;

    // Always filter for "Hazrat Mufti Muhammad Arshad Sb. Bajhedi (D.B.)"
    this.ShortClipModal.Filter = 'Hazrat Mufti Muhammad Arshad Sb. Bajhedi (D.B.)';
  }

  getMolanaBayanList() {
    this.loading = true; // Start loading before making the API call
  
    this.shortClipService.molanaBayanList(this.ShortClipModal).subscribe(
      (response: any) => {
        this.loading = false; // Stop loading when data is received
        if (response.Status) {
          this.dataMolanaBayanList = response.Data
          this.collectionSize = response.TotalCount;
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
    const baseUrl = 'http://apis.baitulmaarif.com/';
    const downloadUrl = `${baseUrl}${mp3Path}`;
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
      url: 'http://apis.baitulmaarif.com/' + bayan.UrMp3Path
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

  openBayanModal(bayan: any, content: any) {
    this.selectedBayan = bayan; // Set the selected bayan
    this.audioUrl = 'http://apis.baitulmaarif.com/' + bayan.UrMp3Path; // Set the audio URL
    this.audioError = false; // Reset the error state
    this.modalService.open(content, { centered: true, size: 'md', backdrop: 'static', keyboard: false }); // Open modal with 'lg' size
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

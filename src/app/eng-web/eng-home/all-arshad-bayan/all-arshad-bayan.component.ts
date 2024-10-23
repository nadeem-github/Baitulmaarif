import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-all-arshad-bayan',
  templateUrl: './all-arshad-bayan.component.html',
  styleUrls: ['./all-arshad-bayan.component.scss']
})
export class AllArshadBayanComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataMolanaBayanList: any[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  selectedBayan: any;
  audioUrl: any;
  audioError: boolean = false;
  loading: boolean = false;
  loadingAudio: boolean = false;
  filteredBayanList: any[] = [];
  searchQuery: string = '';

  constructor(
    private shortClipService: ApisService,
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
          this.applySearchFilter();
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

  onSearchQueryChange() {
    this.applySearchFilter(); // Reapply filter on search input change
  }

  applySearchFilter() {
    if (this.searchQuery.trim()) {
      this.filteredBayanList = this.dataMolanaBayanList.filter(bayan =>
        bayan.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredBayanList = [...this.dataMolanaBayanList]; // Reset filter if no query
    }
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
    this.loadingAudio = true; // Start showing loader when modal is opened
    this.modalService.open(content, { centered: true, size: 'md', backdrop: 'static', keyboard: false }); // Open modal
  }
  
  handleAudioError() {
    this.loadingAudio = false; // Hide loader on error
    this.audioError = true; // Show error message if audio fails to load
  }
  
  onAudioLoad() {
    this.loadingAudio = false; // Hide loader when audio is ready
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';


@Component({
  selector: 'aham-bayan-list',
  standalone: true,
  imports: [DecimalPipe, NgFor, FormsModule, NgbTypeaheadModule, NgbPaginationModule, RouterModule, CommonModule],
  templateUrl: './aham-bayan-list.component.html',
  styleUrls: ['./aham-bayan-list.component.scss']
})
export class AhamBayanListComponent implements OnInit {
  
  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataMolanaBayanList: any[] = [];
  filteredBayanList: any[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  selectedBayan: any;
  audioUrl: any;
  audioError: boolean = false;
  loading: boolean = false;
  loadingAudio: boolean = false;
  searchQuery = ''; // Filter input binding

  constructor(
    private shortClipService: ApisService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.setUpPayload();
    this.getMolanaBayanList();
  }

  setUpPayload() {
    this.ShortClipModal.PageSize = this.pageSize;

    // Always filter for "other"
    this.ShortClipModal.Filter = 'other';
  }

  getMolanaBayanList() {
    this.loading = true; // Start loading before making the API call
  
    this.shortClipService.molanaBayanList(this.ShortClipModal).subscribe(
      (response: any) => {
        this.loading = false; // Stop loading when data is received
        if (response.Status) {
          this.dataMolanaBayanList = response.Data;
          this.filteredBayanList = response.Data;
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

  // New method to filter bayan list based on search input
  filterBayanList(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredBayanList = this.dataMolanaBayanList.filter((bayan) =>
      bayan.Title.toLowerCase().includes(query)
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
      }).catch((error) => {
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

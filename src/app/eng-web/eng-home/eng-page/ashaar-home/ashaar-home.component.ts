import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'ashaar-home',
  templateUrl: './ashaar-home.component.html',
  styleUrls: ['./ashaar-home.component.scss']
})
export class AshaarHomeComponent implements OnInit {

  ShortClipModal: any = {};
  dataShortClipList: any[] = []; // Holds the full list of clips
  filteredShortClipList: any[] = []; // Holds the filtered list
  page = 1;
  pageSize = 6;
  collectionSize = 0;
  searchTitle: string = ''; // Holds the search input value
  selectedCategory: string = 'All Ashaar'; // Holds the selected category
  selectedClip: any; // Holds the currently selected clip

  @ViewChild('clipModal', { static: true }) clipModal: any;

  constructor(private shortClipService: ApisService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.setUpPayload();
    this.getShortClipList();
  }

  setUpPayload() {
    this.ShortClipModal = {
      PageIndexSize: this.page,
      SortOrder: 'desc',
      Filter: '',
      PageSize: this.pageSize,
      SortBy: 'Title',
    };
  }

  getShortClipList() {
    this.shortClipService.getAshaarList(this.ShortClipModal).subscribe(
      (response: any) => {
        if (response.Status) {
          this.dataShortClipList = response.Data;
          this.collectionSize = response.TotalCount;
          this.filteredShortClipList = this.dataShortClipList; // Initially, show all clips
          this.filterByCategory(); // Apply category filtering initially
        } else {
          console.warn('API response status is false');
        }
      },
      (error: any) => {
        console.error('Error fetching short clips:', error);
      }
    );
  }

  filterByCategory() {
    if (this.selectedCategory === 'All Ashaar') {
      this.filteredShortClipList = this.dataShortClipList; // Show all clips
    } else {
      this.filteredShortClipList = this.dataShortClipList.filter(clip =>
        clip.Catagory === this.selectedCategory
      );
    }
    this.collectionSize = this.filteredShortClipList.length; // Update total count after filtering
  }

  filterByTitle() {
    const searchTerm = this.searchTitle.toLowerCase();
    this.filteredShortClipList = this.dataShortClipList.filter(clip =>
      clip.Title.toLowerCase().includes(searchTerm)
    );
    this.collectionSize = this.filteredShortClipList.length; // Update total count after filtering
  }

  onPageChange() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.getShortClipList();
  }

  onPageSizeChange() {
    this.page = 1; // Reset to first page when changing page size
    this.setUpPayload();
    this.getShortClipList();
  }

  openModal(clip: any) {
    this.selectedClip = clip; // Set the selected clip
    this.modalService.open(this.clipModal, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
  }

  getAudioPath(mp3Path: string): string {
    const baseUrl = 'http://apis.baitulmaarif.com/'; // Replace with your actual base URL
    return `${baseUrl}${mp3Path}`;
  }

  downloadFile(mp3Path: string, title: string): void {
    const baseUrl = 'http://apis.baitulmaarif.com/'; // Replace with your actual base URL
    const downloadUrl = `${baseUrl}${mp3Path}`;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = title;
    link.target = '_blank';
    link.click();
  }

  shareClip(clip: any): void {
    const shareUrl = window.location.href; // Get the current page URL

    if (navigator.share) {
      // Use the Web Share API if available
      navigator.share({
        title: clip.Title,
        text: `Check out this clip: ${clip.Title}`,
        url: shareUrl
      }).then(() => {
        console.log('Clip shared successfully');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback to copying the link to clipboard if Web Share API is not supported
      const dummyInput = document.createElement('input');
      dummyInput.value = shareUrl;
      document.body.appendChild(dummyInput);
      dummyInput.select();
      document.execCommand('copy');
      document.body.removeChild(dummyInput);
      alert('Link copied to clipboard');
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

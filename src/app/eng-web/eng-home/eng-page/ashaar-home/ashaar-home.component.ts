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
  dataAshaarList: any[] = []; // Holds the full list of clips
  page = 0;
  pageSize = 6;
  collectionSize = 0;
  selectedClip: any; // Holds the currently selected clip
  loading: boolean = false;

  @ViewChild('clipModal', { static: true }) clipModal: any;

  constructor(private shortClipService: ApisService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.setUpPayload();
    this.getAshaarList();
  }

  setUpPayload() {
    this.ShortClipModal = {
      PageIndexSize: this.page,
      SortOrder: 'desc',
      Filter: '',
      PageSize: this.pageSize,
      SortBy: '',
    };
  }

  getAshaarList() {
    this.loading = true;
    this.shortClipService.getAshaarList(this.ShortClipModal).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.Status) {
          this.dataAshaarList = response.Data;
          this.collectionSize = response.TotalCount;
        } else {
          console.warn('API response status is false');
        }
      },
      (error: any) => {
        this.loading = false;
        console.error('Error fetching short clips:', error);
      }
    );
  }

  onPageChange() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.getAshaarList();
  }

  onPageSizeChange() {
    this.page = 1; // Reset to first page when changing page size
    this.setUpPayload();
    this.getAshaarList();
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

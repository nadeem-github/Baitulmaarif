import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'short-clip-home',
  templateUrl: './short-clip-home.component.html',
  styleUrls: ['./short-clip-home.component.scss']
})
export class ShortClipHomeComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  isLoading = true;
  baseUrl = 'http://apis.baitulmaarif.com/';
  dataShortClipList: any[] = [];
  currentPage = 1;
  pageSize = 6;  // Default page size for desktop
  totalItems = 0;
  selectedVideo: any;

  constructor(private shortClipService: ApisService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.setUpPayload();
    this.getShortClipList();
    this.adjustPageSize(window.innerWidth);  // Set initial page size based on current window size
  }

  setUpPayload() {
    // Setup payload for API request
  }

  getShortClipList() {
    this.isLoading = true;
    this.shortClipService.fetchShortClipList(this.ShortClipModal).subscribe(
      (response: any) => {
        if (response.Status) {
          this.dataShortClipList = response.Data;
          this.totalItems = this.dataShortClipList.length;
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  // Pagination logic
  get paginatedVideos() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataShortClipList.slice(startIndex, endIndex);
  }

  // Function to open modal and pass video data
  openModal(content: any, video: any) {
    this.selectedVideo = video;
    this.modalService.open(content, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustPageSize(event.target.innerWidth);  // Adjust page size on window resize
  }

  adjustPageSize(width: number) {
    if (width < 768) {
      this.pageSize = 2;  // Mobile: 2 items per page
    } else {
      this.pageSize = 6;  // Desktop: 6 items per page
    }
  }

  downloadVideo(video: any) {
    const downloadLink = this.baseUrl + video.Mp4path;
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = video.Title + '.mp4';
    a.click();
  }

  shareVideo(video: any) {
    const shareLink = this.baseUrl + video.Mp4path;
    window.prompt('Copy this link to share:', shareLink);
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

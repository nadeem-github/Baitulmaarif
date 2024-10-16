import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  isLoading = true;
  baseUrl = 'http://apis.baitulmaarif.com/';
  dataShortClipList: any[] = [];
  currentPage = 1;
  pageSize = 8;  // Default page size for desktop
  totalItems = 0;
  selectedVideo: any;

  constructor(private shortClipService: ApisService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getShortClipList();
    this.checkScreenSize();  // Check initial screen size
  }

  

  getShortClipList() {
    this.isLoading = true;
    this.shortClipService.fetchShortClipList(this.ShortClipModal).subscribe(
      (response: any) => {
        if (response.Status) {
          this.dataShortClipList = response.Data;
          this.totalItems = this.dataShortClipList.length;
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
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
    this.modalService.open(content, { size: 'md', centered: true, backdrop: 'static', keyboard: false });  // Disable closing on click outside
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {  // Mobile screen
      this.pageSize = 6;
    } else {  // Desktop screen
      this.pageSize = 12;
    }
  }

  // Function to download video
  downloadVideo(video: any) {
    const downloadLink = this.baseUrl + video.Mp4path;
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = video.Title + '.mp4';  // Set the file name for download
    a.click();
  }

  // Function to share video (basic example, more logic can be added for social sharing)
  shareVideo(video: any) {
    const shareLink = this.baseUrl + video.Mp4path;
    window.prompt('Copy this link to share:', shareLink);
  }

}

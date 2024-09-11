import { Component, OnInit } from '@angular/core';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {

  isLoading = true;
  videoSource = "assets/video/short-clip-1.mp4";

  ShortClipModal: ShortClipModal = new ShortClipModal();

  dataShortClipList: any[] = [];

  constructor(private shortClipService: ApisService) { }

  ngOnInit(): void {
    this.setUpPayload();
    this.getShortClipList();
  }

  setUpPayload() {
    // Set the payload values if needed
    this.ShortClipModal.PageIndexSize = 1;
    this.ShortClipModal.SortOrder = 'desc';
    this.ShortClipModal.Filter = '';  // Add any filter if required
    this.ShortClipModal.PageSize = 10;
    this.ShortClipModal.SortBy = 'Title';
  }

  getShortClipList(){
    this.shortClipService.fetchShortClipList(this.ShortClipModal).subscribe(
      (response: any) => {
        // console.log('API Response:', response);
        if (response.Status) {
          this.dataShortClipList = response;
          console.log('Data', this.dataShortClipList);
        } else {
          console.warn('API response status is false');
        }
      },
      (error) => {
        console.error('Error fetching short clips:', error);
      }
    );
  }

}

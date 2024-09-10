import { Component, OnInit } from '@angular/core';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {

  videoSource = "assets/video/short-clip-1.mp4";

  ShortClipModal: ShortClipModal = new ShortClipModal();

  dataShortClipList: any[] = [];
  
  constructor(private shortClipService: ApisService) { }

  ngOnInit(): void {
    this.getShortClipList()
  }
  
  getShortClipList(){
    this.shortClipService.fetchShortClipList(this.ShortClipModal).subscribe((response: any) => {
      if (response.Status) {
        this.dataShortClipList = response.result;
      }
      console.log('Data', this.dataShortClipList);
    });
  }

}

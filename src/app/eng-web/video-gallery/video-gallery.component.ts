import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {
  videoSource = "assets/video/short-clip-1.mp4";
  constructor() { }

  ngOnInit(): void {
  }

}

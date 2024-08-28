import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-full-video',
  templateUrl: './full-video.component.html',
  styleUrls: ['./full-video.component.scss']
})
export class FullVideoComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  videoSource = "assets/video/short-clip-3.mp4";

  goBack() {
    this.location.back()
  }

}

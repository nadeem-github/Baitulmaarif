import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'islahi-bayan-home',
  templateUrl: './islahi-bayan-home.component.html',
  styleUrls: ['./islahi-bayan-home.component.scss']
})
export class IslahiBayanHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isAudioPlaying = false;

  updateAudioState(event: Event) {
    const audioElement = event.target as HTMLAudioElement;
    this.isAudioPlaying = !audioElement.paused;
  }

}

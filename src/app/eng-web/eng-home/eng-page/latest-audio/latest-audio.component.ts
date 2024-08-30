import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'latest-audio',
  templateUrl: './latest-audio.component.html',
  styleUrls: ['./latest-audio.component.scss'],
})
export class LatestAudioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isAudioPlaying = false;
  isAudioPlaying2 = false;
  isAudioPlaying3 = false;

  updateAudioState(event: Event) {
    const audioElement = event.target as HTMLAudioElement;
    this.isAudioPlaying = !audioElement.paused;
  }
  updateAudioState2(event: Event) {
    const audioElement = event.target as HTMLAudioElement;
    this.isAudioPlaying2 = !audioElement.paused;
  }
  updateAudioState3(event: Event) {
    const audioElement = event.target as HTMLAudioElement;
    this.isAudioPlaying3 = !audioElement.paused;
  }

}

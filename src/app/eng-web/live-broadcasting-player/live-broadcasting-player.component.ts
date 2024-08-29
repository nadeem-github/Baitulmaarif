import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'live-broadcasting-player',
  templateUrl: './live-broadcasting-player.component.html',
  styleUrls: ['./live-broadcasting-player.component.scss']
})
export class LiveBroadcastingPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;
  isPlaying = false;
  isMuted = false;
  currentTime = '00:00';
  currentProgress = 0;
  currentVolume = 50; // Default volume at 50%

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    this.isPlaying ? this.audioRef.nativeElement.play() : this.audioRef.nativeElement.pause();
  }

  updateTime(event: Event) {
    const audio = event.target as HTMLAudioElement;
    this.currentTime = this.formatTime(audio.currentTime);
    this.currentProgress = (audio.currentTime / audio.duration) * 100 || 0;

    // Update progress bar background dynamically
    this.setProgressBarStyle(this.currentProgress);
  }

  seekAudio(event: Event) {
    const audio = this.audioRef.nativeElement;
    const input = event.target as HTMLInputElement;
    audio.currentTime = (audio.duration * +input.value) / 100;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioRef.nativeElement.muted = this.isMuted;
  }

  adjustVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.currentVolume = +input.value;
    this.audioRef.nativeElement.volume = this.currentVolume / 100;
  }

  onAudioEnd() {
    this.isPlaying = false;
    this.currentTime = '00:00';
    this.currentProgress = 0;
    this.setProgressBarStyle(this.currentProgress);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${this.padZero(mins)}:${this.padZero(secs)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // Set progress bar background fill dynamically
  setProgressBarStyle(progress: number) {
    document.documentElement.style.setProperty('--progress', `${progress}%`);
  }

}

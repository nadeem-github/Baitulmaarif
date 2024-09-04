import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'live-broadcasting-player',
  templateUrl: './live-broadcasting-player.component.html',
  styleUrls: ['./live-broadcasting-player.component.scss']
})
export class LiveBroadcastingPlayerComponent implements OnInit {

  constructor() { }

  @ViewChild('audioRef', { static: true }) audioRef!: ElementRef<HTMLAudioElement>;

  isPlaying: boolean = false;
  isMuted: boolean = false;
  currentTime: string = '00:00';
  currentProgress: number = 0;
  currentVolume: number = 100; // Initial volume (100%)
  isAirStatusOn: boolean = false; // ON AIR or OFF AIR status
  hasAutoplayed: boolean = false; // Flag to ensure autoplay happens only once on initial load

  ngOnInit() {
    this.checkAirStatus();
  }

  ngOnDestroy() {
    // Ensure the audio is paused when the component is destroyed
    this.audioRef.nativeElement.pause();
  }

  // Check if the audio source is active or inactive
  checkAirStatus() {
    const audioElement = this.audioRef.nativeElement;

    audioElement.addEventListener('canplay', () => {
      this.isAirStatusOn = true; // ON AIR if the source is valid

      if (!this.hasAutoplayed) {
        this.autoplayAudio(); // Autoplay only on the first load
        this.hasAutoplayed = true; // Set the flag to true after autoplay
      }
    });

    audioElement.addEventListener('error', () => {
      this.isAirStatusOn = false; // OFF AIR if the source is invalid
    });

    audioElement.addEventListener('ended', () => {
      this.isPlaying = false;
      // Keep the status ON AIR even after the audio ends if the source is valid
    });

    // Manually trigger a source check if the audio is already loaded
    if (audioElement.readyState >= 2) {
      this.isAirStatusOn = true;
      if (!this.hasAutoplayed) {
        this.autoplayAudio(); // Autoplay only on the first load
        this.hasAutoplayed = true; // Set the flag to true after autoplay
      }
    }
  }

  // Autoplay the audio when the source is valid
  autoplayAudio() {
    if (this.isAirStatusOn) {
      this.isPlaying = true;
      this.audioRef.nativeElement.play().catch(() => {
        this.isPlaying = false;
        this.isAirStatusOn = false; // OFF AIR if there's an error starting playback
      });
    }
  }

  // Toggle Play/Pause
  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    const audioElement = this.audioRef.nativeElement;

    if (this.isPlaying) {
      audioElement.play().catch(() => {
        this.isPlaying = false;
        this.isAirStatusOn = false; // OFF AIR if there's an error starting playback
      });
    } else {
      audioElement.pause();
      // Keep ON AIR status when paused, as long as the source is valid
    }
  }

  // Toggle Mute/Unmute
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioRef.nativeElement.muted = this.isMuted;
  }

  // Seek Audio Position
  seekAudio(event: Event) {
    const input = event.target as HTMLInputElement;
    const seekTime = (this.audioRef.nativeElement.duration / 100) * Number(input.value);
    this.audioRef.nativeElement.currentTime = seekTime;
    this.updateProgressBar();
  }

  // Adjust Volume
  adjustVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    const volume = Number(input.value) / 100;
    this.currentVolume = Number(input.value);
    this.audioRef.nativeElement.volume = volume;
  }

  // Update Current Time and Progress Bar
  updateTime(event: Event) {
    const currentTime = this.audioRef.nativeElement.currentTime;
    const duration = this.audioRef.nativeElement.duration;
    this.currentProgress = (currentTime / duration) * 100;
    this.currentTime = this.formatTime(currentTime);
    this.updateProgressBar();
  }

  // Handle Audio Ended Event
  onAudioEnd() {
    this.isPlaying = false;
    this.currentProgress = 0;
    this.currentTime = '00:00';
    // Keep ON AIR status when audio ends, as long as the source is valid
  }

  // Format Time as MM:SS
  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Update Progress Bar Background Fill
  private updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar') as HTMLInputElement;
    if (progressBar) {
      const value = (Number(progressBar.value) / Number(progressBar.max)) * 100;
      progressBar.style.background = `linear-gradient(to right, #ffffff ${value}%, #9c9793 ${value}%)`;
    }
  }
}

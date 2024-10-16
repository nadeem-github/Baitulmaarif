import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';

interface Bayan {
  MajlisType?: string;
  Title?: string;
  Mp3Path?: string;
  Catagory?: string;
  UploadDate?: Date;
}

@Component({
  selector: 'jumerat-majlis-home',
  templateUrl: './jumerat-majlis-home.component.html',
  styleUrls: ['./jumerat-majlis-home.component.scss']
})
export class JumeratMajlisHomeComponent implements OnInit {

  public baseURL = 'http://apis.baitulmaarif.com/';
  bayanData: Bayan | null = null;
  isAudioPlaying: boolean = false;
  isLoading = true;

  constructor(
    private bayanService: ApisService,
  ) { }

  ngOnInit(): void {
    this.getjumeratMajlis();
  }

  getjumeratMajlis() {
    this.isLoading = true;
    this.bayanService.jumeratMajlis().subscribe(
      (response: any) => {
        if (response.Status) {
          this.bayanData = response.Data[0];
          this.isLoading = false;
        } else {
          console.warn('API response status is false');
          this.isLoading = false;
        }
      },
      (error) => {
        console.error('Error fetching bayan data', error);
        this.isLoading = false;
      }
    );
  }

  updateAudioState(event: Event): void {
    const audioEvent = event as Event;
    this.isAudioPlaying = audioEvent.type === 'play'; // Correctly set isAudioPlaying based on play event
  }


  shareBayan() {
    if (navigator.share && this.bayanData) {
      navigator.share({
        title: this.bayanData.Title || 'Jumerat Majlis',
        text: 'Check out this bayan',
        url: this.baseURL + this.bayanData.Mp3Path
      }).catch((error) => console.error('Error sharing bayan:', error));
    } else {
      console.warn('Share feature not supported or bayan data is missing.');
    }
  }

}

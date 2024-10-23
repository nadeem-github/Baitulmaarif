import { Component, OnInit } from '@angular/core';
import { SliderData } from 'src/app/modals/slider.model';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'eng-top-slider',
  templateUrl: './eng-top-slider.component.html',
  styleUrls: ['./eng-top-slider.component.scss']
})
export class EngTopSliderComponent implements OnInit {

  currentIndex: number = 0;
  intervalId: any;
  baseURL: string = 'http://apis.baitulmaarif.com';
  loading: boolean = false;

  // Store individual image paths
  SliderImagePath1: string | null = null;
  SliderImagePath2: string | null = null;
  SliderImagePath3: string | null = null;
  SliderImagePath4: string | null = null;

  constructor(private sliderService: ApisService) { }

  ngOnInit() {
    this.getSliderImage(); // Fetch images when component initializes
  }

  getSliderImage() {
    this.loading = true;
    this.sliderService.topSlider().subscribe(
      (response: any[]) => {
        this.loading = false;

        if (response.length > 0) {
          const data = response[0];

          this.SliderImagePath1 = data.SliderImagePath1 || null;
          this.SliderImagePath2 = data.SliderImagePath2 || null;
          this.SliderImagePath3 = data.SliderImagePath3 || null;
          this.SliderImagePath4 = data.SliderImagePath4 || null;

          this.currentIndex = 0; // Reset index
          this.autoSlide(); // Start the auto-slide
        }
      },
      error => {
        this.loading = false;
        console.error('Error fetching slider images:', error); // Handle errors
      }
    );
  }

  // Helper function to construct image paths or provide a fallback
  getImagePath(path: string | null): string {
    return path ? `${this.baseURL}/${path.replace(/\\/g, '/')}` : 'assets/images/sliderDummy.png';
  }

  autoSlide() {
    this.stopAutoSlide(); // Stop any existing interval
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % 5; // Now cycle through 5 slides
      this.setCheckedSlide(this.currentIndex);
    }, 3000); // Change slide every 3 seconds
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  setCheckedSlide(index: number) {
    const sliderInputs = document.querySelectorAll('input[name="slider"]');
    if (sliderInputs[index]) {
      (sliderInputs[index] as HTMLInputElement).checked = true;
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide(); // Clean up the interval on component destruction
  }

}

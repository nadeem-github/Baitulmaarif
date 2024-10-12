import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'eng-top-slider',
  templateUrl: './eng-top-slider.component.html',
  styleUrls: ['./eng-top-slider.component.scss']
})
export class EngTopSliderComponent implements OnInit {

  currentIndex: number = 0;
  slideCount: number = 5;
  intervalId: any;
  sliderImages: string[] = [];

  constructor(private sliderService: ApisService) {}

  ngOnInit() {
    this.autoSlide();
  }

  autoSlide() {
    this.stopAutoSlide(); // Clear any existing interval before starting a new one
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slideCount;
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
    (sliderInputs[index] as HTMLInputElement).checked = true;
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  getSliderImage(){
    this.sliderService.topSlider().subscribe(data => {
      // this.sliderImages = this.data; // Extract image paths
      this.slideCount = this.sliderImages.length; // Update slide count
      this.autoSlide(); // Start the auto-slide after fetching images
    })
  }

}

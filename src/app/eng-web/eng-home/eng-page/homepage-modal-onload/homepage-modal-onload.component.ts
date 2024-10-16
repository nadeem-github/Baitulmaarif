import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'homepage-modal-onload',
  styleUrls: ['./homepage-modal-onload.component.scss'],
  templateUrl: './homepage-modal-onload.component.html',
})
export class HomepageModalOnloadComponent implements OnInit {

  announcementImages: any[] = [];
  isLoading = true;
  isError = false;
  currentIndex = 0; // To track the current slide

  constructor(public activeModal: NgbActiveModal, private announcementService: ApisService) { }

  ngOnInit(): void {
    this.fetchAnnouncementImages();
  }

  fetchAnnouncementImages(): void {
    this.isLoading = true;
    this.isError = false; // Reset error state

    this.announcementService.announcementImage().subscribe(
      (response: any[]) => {
        this.isLoading = false;
        this.announcementImages = response.map(image => ({
          ...image,
          ImgPath: `http://apis.baitulmaarif.com/${image.ImgPath.replace(/\\/g, '/')}`
        }));
      },
      error => {
        this.isLoading = false;
        this.isError = true; // Handle error state
        console.error('Failed to fetch announcement images:', error);
      }
    );
  }

  nextSlide(): void {
    if (this.currentIndex < this.announcementImages.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the first slide
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.announcementImages.length - 1; // Go to the last slide
    }
  }

  closeModal(): void {
    this.activeModal.close();
  }

}

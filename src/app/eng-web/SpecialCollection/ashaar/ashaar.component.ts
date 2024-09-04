import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ashaar',
  templateUrl: './ashaar.component.html',
  styleUrls: ['./ashaar.component.scss']
})
export class AshaarComponent implements OnInit {

  ngOnInit(): void {
  }

  images = [
    { src: 'assets/images/sCollection/ashaar-1.webp' },
    { src: 'assets/images/sCollection/ashaar-2.webp' },
    { src: 'assets/images/sCollection/ashaar-1.webp' },
    { src: 'assets/images/sCollection/ashaar-2.webp' },
    { src: 'assets/images/sCollection/ashaar-1.webp' },
    { src: 'assets/images/sCollection/ashaar-2.webp' },
    { src: 'assets/images/sCollection/ashaar-1.webp' },
    { src: 'assets/images/sCollection/ashaar-2.webp' },
    { src: 'assets/images/sCollection/ashaar-1.webp' },
    { src: 'assets/images/sCollection/ashaar-2.webp' },
    { src: 'assets/images/sCollection/ashaar-1.webp' },
    { src: 'assets/images/sCollection/ashaar-2.webp' },
  ];

  selectedImage: any;
  selectedIndex: number = 0;
  loading: boolean = true; // To handle the loader

  @ViewChild('imageModal', { static: true }) imageModal!: TemplateRef<any>;

  constructor(private modalService: NgbModal) { }

  openModal(index: number) {
    this.selectedIndex = index;
    this.selectedImage = this.images[this.selectedIndex];
    this.loading = true; // Set loading to true when opening modal
    this.modalService.open(this.imageModal, { size: 'md', centered: true });
  }

  onImageLoad() {
    this.loading = false; // Hide the loader once the image is fully loaded
  }

  previousImage() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.selectedImage = this.images[this.selectedIndex];
      this.loading = true; // Show loader when navigating to another image
    }
  }

  nextImage() {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
      this.selectedImage = this.images[this.selectedIndex];
      this.loading = true; // Show loader when navigating to another image
    }
  }

  shareImage(imageSrc: string) {
    if (navigator.share) {
      navigator.share({
        title: 'Special Collection',
        text: 'Check out this image!',
        url: imageSrc,
      }).catch(error => console.log('Error sharing:', error));
    } else {
      console.log('Share API not supported.');
    }
  }

}

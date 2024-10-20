import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-duayen',
  templateUrl: './duayen.component.html',
  styleUrls: ['./duayen.component.scss']
})
export class DuayenComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataDuayen: any[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  selectedImage: any;
  loading = false;
  selectedIndex: number = 0;

  public BASE_URL = 'http://apis.baitulmaarif.com/';

  @ViewChild('imageModal', { static: true }) imageModal!: TemplateRef<any>;

  constructor(private shortClipService: ApisService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getMolanaBayanList();
  }

  private getMolanaBayanList(): void {
    this.loading = true;
    const payload = {
      PageSize: this.pageSize,
      PageIndexSize: this.page,
      Filter: 'Dua',
    };

    this.shortClipService.specialCollectionList(this.ShortClipModal).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.Status) {
          this.dataDuayen = response.Data.filter((item: any) => item.Category === 'Dua');
          this.collectionSize = this.dataDuayen.length;
        } else {
          console.warn('API response status is false');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching bayan list:', error);
      }
    );
  }

  openModal(index: number) {
    this.selectedIndex = index;
    this.selectedImage = this.dataDuayen[this.selectedIndex];
    this.modalService.open(this.imageModal, { size: 'md', centered: true, backdrop: 'static', keyboard: false, });
  }

  previousImage() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.selectedImage = this.dataDuayen[this.selectedIndex];
    }
  }

  nextImage() {
    if (this.selectedIndex < this.dataDuayen.length - 1) {
      this.selectedIndex++;
      this.selectedImage = this.dataDuayen[this.selectedIndex];
    }
  }

  downloadImage(): void {
    const imageUrl = `${this.BASE_URL}${this.selectedImage?.ImgPath}`;
    const fileName = this.selectedImage?.Title?.replace(/\s+/g, '_') || 'downloaded-image.jpg';

    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url); // Clean up the URL object
      })
      .catch((error) => {
        console.error('Error downloading the image:', error);
        alert('Failed to download the image.');
      });
  }


  shareImage(image: any): void {
    const imageUrl = `${this.BASE_URL}${image.ImgPath}`;
    const title = image.Title || 'Check out this image';
    const text = `Take a look at this: ${title}`;

    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text,
          url: imageUrl,
        })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      console.warn('Web Share API not supported in this browser.');
      alert('Sharing is not supported on your device.');
    }
  }


}

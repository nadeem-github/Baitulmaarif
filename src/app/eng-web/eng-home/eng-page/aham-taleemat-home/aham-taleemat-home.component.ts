import { Component, OnInit } from '@angular/core';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'aham-taleemat-home',
  templateUrl: './aham-taleemat-home.component.html',
  styleUrls: ['./aham-taleemat-home.component.scss']
})
export class AhamTaleematHomeComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  baseURL: string = 'http://apis.baitulmaarif.com';
  loading: boolean = false;

  images: string[] = [];

  constructor(private sliderService: ApisService) { }

  ngOnInit(): void {
    this.getAhamTalemat();
  }

  getAhamTalemat() {
    this.loading = true;
    this.sliderService.ahamTaleemat(this.ShortClipModal).subscribe(
      (response) => {
        if (response.Data && response.Data.length > 0) {
          this.loading = false;
          const data = response.Data[0]; // Use the first object from the response
          this.images = [
            data.UrImagePath1,
            data.UrImagePath2,
            data.UrImagePath3,
            data.UrImagePath4,
            data.UrImagePath5
          ].map(imgPath =>
            imgPath ? `${this.baseURL}/${imgPath}` : ''
          );
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data', error);
      }
    );
  }

}

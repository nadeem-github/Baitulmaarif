import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from 'src/app/services/apis.service';
import { ShortClipModal } from 'src/app/modals/ShortClipList';

@Component({
  selector: 'app-bayan-detail',
  templateUrl: './bayan-detail.component.html',
  styleUrls: ['./bayan-detail.component.scss']
})
export class BayanDetailComponent implements OnInit {

  bayanDetail: any;
  baseUrl = 'http://apis.baitulmaarif.com/';
  constructor(
    private route: ActivatedRoute,
    private apiService: ApisService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const bayanId = this.route.snapshot.paramMap.get('id');

    if (bayanId) {
      this.getBayanDetail(bayanId);
    }
  }

  getBayanDetail(bayanId: string) {
    const shortClipModal: ShortClipModal = {
      PageIndexSize: 1,
      PageSize: 10,
      SortOrder: 'desc',
      SortBy: 'Title',
      Filter: '',
      MolanaBayanId: undefined
    };

    // Call the updated service method with the ShortClipModal and bayanId
    this.apiService.getBayanDetailById(shortClipModal, bayanId).subscribe(
      (response: any) => {
        if (response.Status) {
          this.bayanDetail = response; // Store the bayan detail
          console.log('bayanDetail', this.bayanDetail);

        } else {
          console.warn('API response status is false');
        }
      },
      (error) => {
        console.error('Error fetching bayan details:', error);
      }
    );
  }


  goBack() {
    this.location.back()
  }

}

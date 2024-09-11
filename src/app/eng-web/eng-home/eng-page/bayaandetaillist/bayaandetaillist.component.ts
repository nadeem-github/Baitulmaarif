import { CommonModule, DatePipe, DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-bayaandetaillist',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule, RouterModule, NgFor, DatePipe, CommonModule],
  templateUrl: './bayaandetaillist.component.html',
  styleUrls: ['./bayaandetaillist.component.scss']
})
export class BayaandetaillistComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataMolanaBayanList: any[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0; // Total number of items
  catagory: any;

  constructor(
    private shortClipService: ApisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catagory = params.get('catagory');
      this.setUpPayload();
      this.getMolanaBayanList();
    });
  }

  setUpPayload() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.ShortClipModal.SortOrder = 'desc';
    this.ShortClipModal.Filter = this.catagory; // Use Maulana ID as filter
    this.ShortClipModal.PageSize = this.pageSize;
    this.ShortClipModal.SortBy = 'Title';
  }

  getMolanaBayanList() {
    this.shortClipService.molanaBayanList(this.ShortClipModal).subscribe(
      (response: any) => {
        if (response.Status) {
          this.dataMolanaBayanList = response.Data;
          this.collectionSize = response.TotalCount; // Assuming the total count is returned in the response
        } else {
          console.warn('API response status is false');
        }
      },
      (error) => {
        console.error('Error fetching short clips:', error);
      }
    );
  }

  onPageChange() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.getMolanaBayanList();
  }

  onPageSizeChange() {
    this.page = 1; // Reset to first page when changing page size
    this.setUpPayload();
    this.getMolanaBayanList();
  }

  downloadFile(mp3Path: string, title: string): void {
    const baseUrl = 'http://apis.baitulmaarif.com/'; // Replace with your actual base URL
    const downloadUrl = `${baseUrl}${mp3Path}`;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = title; // Optional: Set the download attribute to specify the filename
    link.target = '_blank';
    link.click();
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

import { CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-islahi-ashaar',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule, RouterModule, NgFor, CommonModule],
  templateUrl: './islahi-ashaar.component.html',
  styleUrls: ['./islahi-ashaar.component.scss']
})

export class IslahiAshaarComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataShortClipList: any[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0; // Total number of items

  constructor(private shortClipService: ApisService) {}

  ngOnInit(): void {
    this.setUpPayload();
    this.getShortClipList();
  }

  setUpPayload() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.ShortClipModal.SortOrder = 'desc';
    this.ShortClipModal.Filter = '';
    this.ShortClipModal.PageSize = this.pageSize;
    this.ShortClipModal.SortBy = 'Title';
  }

  getShortClipList() {
    this.shortClipService.fetchShortClipList(this.ShortClipModal).subscribe(
      (response: any) => {
        if (response.Status) {
          this.dataShortClipList = response.Data;
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
    this.getShortClipList();
  }

  onPageSizeChange() {
    this.page = 1; // Reset to first page when changing page size
    this.setUpPayload();
    this.getShortClipList();
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

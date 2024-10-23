import { CommonModule, DatePipe, DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
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
  collectionSize = 0;
  catagory: any;
  searchTerm: string = '';
  selectedCategory = 'All Bayanaat'; // Default selected category
  selectedBayan: any;
  audioUrl: any;
  loading: boolean = false;

  constructor(
    private shortClipService: ApisService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catagory = params.get('catagory');
      this.setUpPayload();
      this.getMolanaBayanList();
    });
  }

  setUpPayload() {  
    if (this.selectedCategory === 'All Bayanaat') {
      this.ShortClipModal.Filter = ''; // Empty filter means no category filter
    } else {
      this.ShortClipModal.Filter = this.selectedCategory.trim(); // Trim to remove any extra spaces
    }
  }
  
  getMolanaBayanList() {
    this.loading = true;
    this.shortClipService.molanaBayanList(this.ShortClipModal).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.Status) {
          // Filter the records based on search term
          this.dataMolanaBayanList = response.Data.filter((bayan: { Title: string; }) =>
            bayan.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
  
          this.collectionSize = response.TotalCount;
        } else {
          console.warn('API response status is false');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching short clips:', error);
      }
    );
  }  
  

  onSearchChange() {
    this.page = 1; 
    this.setUpPayload(); 
    this.getMolanaBayanList();
  }

  // Triggered when the category changes
  onCategoryChange(event: any) {
    this.page = 1; 
    this.setUpPayload();
    this.getMolanaBayanList();
  }

  onPageChange() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.getMolanaBayanList();
  }

  onPageSizeChange() {
    this.page = 1;
    this.setUpPayload();
    this.getMolanaBayanList();
  }

  downloadFile(mp3Path: string, title: string): void {
    const baseUrl = 'http://apis.baitulmaarif.com/';
    const downloadUrl = `${baseUrl}${mp3Path}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = title;
    link.target = '_blank';
    link.click();
  }

  shareBayan(bayan: any): void {
    const shareData = {
      title: bayan.Title,
      text: bayan.Description,
      url: 'http://apis.baitulmaarif.com/' + bayan.UrMp3Path
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
      }).catch((error) => {
        console.error('Error sharing bayan:', error);
      });
    } else {
      // Fallback for browsers that don't support the share API
      console.warn('Web Share API is not supported in this browser.');
      alert('Sharing is not supported in this browser.');
    }
  }

  openBayanModal(bayan: any, content: any) {
    this.selectedBayan = bayan; // Set the selected bayan
    this.audioUrl = 'http://apis.baitulmaarif.com/' + bayan.UrMp3Path; // Set the audio URL
    this.modalService.open(content, { centered: true, size: 'md', backdrop: 'static', keyboard: false }); // Open modal with 'lg' size
  }

}

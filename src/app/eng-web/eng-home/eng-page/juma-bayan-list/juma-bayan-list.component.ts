import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'juma-bayan-list',
  templateUrl: './juma-bayan-list.component.html',
  styleUrls: ['./juma-bayan-list.component.scss']
})
export class JumaBayanListComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataJumaByanList: any[] = [];
  filteredJumaByanList: any[] = []; // Filtered list for search
  page = 0;
  pageSize = 10;
  collectionSize = 0;
  catagory: any;
  searchTerm: string = '';
  selectedBayan: any;
  audioUrl: any;
  audioError: boolean = false;
  loadingAudio: boolean = false;

  constructor(
    private shortClipService: ApisService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catagory = params.get('catagory');
      this.setUpPayload();
      this.getJumaByanList();
    });
  }

  setUpPayload() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.ShortClipModal.SortOrder = 'desc';
    this.ShortClipModal.PageSize = this.pageSize;
  }

  getJumaByanList() {
    this.shortClipService.jumaBayaan(this.ShortClipModal).subscribe(
      (response: any) => {
        if (response.Status) {
          this.dataJumaByanList = response.Data;
          this.filterData(); // Apply search filter after receiving data
          this.collectionSize = response.TotalCount;
        } else {
          console.warn('API response status is false');
        }
      },
      (error) => {
        console.error('Error fetching short clips:', error);
      }
    );
  }

  onSearchChange() {
    this.page = 1; // Reset to the first page when search term changes
    this.filterData(); // Filter the data locally
  }

  filterData() {
    this.filteredJumaByanList = this.dataJumaByanList.filter((bayan: { Title: string; }) =>
      bayan.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onPageChange() {
    this.ShortClipModal.PageIndexSize = this.page;
    this.getJumaByanList();
  }

  onPageSizeChange() {
    this.page = 1;
    this.setUpPayload();
    this.getJumaByanList();
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
        console.log('Bayan shared successfully');
      }).catch((error) => {
        console.error('Error sharing bayan:', error);
      });
    } else {
      console.warn('Web Share API is not supported in this browser.');
      alert('Sharing is not supported in this browser.');
    }
  }

  openBayanModal(bayan: any, content: any) {
    this.selectedBayan = bayan; // Set the selected bayan
    this.audioUrl = 'http://apis.baitulmaarif.com/' + bayan.UrMp3Path; // Set the audio URL
    this.audioError = false; // Reset the error state
    this.loadingAudio = true; // Start showing loader when modal is opened
    this.modalService.open(content, { centered: true, size: 'md', backdrop: 'static', keyboard: false }); // Open modal
  }
  
  handleAudioError() {
    this.loadingAudio = false; // Hide loader on error
    this.audioError = true; // Show error message if audio fails to load
  }
  
  onAudioLoad() {
    this.loadingAudio = false; // Hide loader when audio is ready
  }

}

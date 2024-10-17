import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

const BASE_URL = 'http://apis.baitulmaarif.com/'; // Base URL

@Component({
  selector: 'juma-bayan-list',
  templateUrl: './juma-bayan-list.component.html',
  styleUrls: ['./juma-bayan-list.component.scss']
})
export class JumaBayanListComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataJumaByanList: any[] = [];
  filteredJumaByanList: any[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  category: string | null = '';
  searchTerm = '';
  selectedBayan: any;
  audioUrl: string | null = null;
  audioError = false;
  loadingAudio = false;
  loading = false;

  constructor(
    private shortClipService: ApisService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      this.fetchJumaByanList();
    });
  }

  fetchJumaByanList(): void {
    this.loading = true;
    const payload = {
      PageIndexSize: this.page,
      SortOrder: 'desc',
      PageSize: this.pageSize,
    };

    this.shortClipService.jumaBayaan(this.ShortClipModal).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.Status) {
          this.dataJumaByanList = response.Data;
          this.collectionSize = response.TotalCount;
          this.filterData();
        } else {
          console.warn('API response status is false');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
      }
    );
  }

  filterData(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredJumaByanList = this.dataJumaByanList.filter(bayan =>
      bayan.Title.toLowerCase().includes(term)
    );
  }

  onSearchChange(): void {
    this.page = 1;
    this.filterData();
  }

  onPageChange(): void {
    this.fetchJumaByanList();
  }

  onPageSizeChange(): void {
    this.page = 1;
    this.fetchJumaByanList();
  }

  downloadFile(mp3Path: string, title: string): void {
    const downloadUrl = `${BASE_URL}${mp3Path}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = title;
    link.click();
  }

  shareBayan(bayan: any): void {
    const shareData = {
      title: bayan.Title,
      text: bayan.Description,
      url: `${BASE_URL}${bayan.Mp3Path}`,
    };

    if (navigator.share) {
      navigator.share(shareData).then(() =>
        console.log('Bayan shared successfully')
      ).catch(error =>
        console.error('Error sharing bayan:', error)
      );
    } else {
      alert('Sharing is not supported in this browser.');
    }
  }

  openBayanModal(bayan: any, content: any): void {
    this.selectedBayan = bayan;
    this.audioUrl = `${BASE_URL}${bayan.Mp3Path}`;
    this.audioError = false;
    this.loadingAudio = true;

    this.modalService.open(content, {
      centered: true,
      size: 'md',
      backdrop: 'static',
      keyboard: false
    });
  }

  handleAudioError(): void {
    this.loadingAudio = false;
    this.audioError = true;
  }

  onAudioLoad(): void {
    this.loadingAudio = false;
  }

}

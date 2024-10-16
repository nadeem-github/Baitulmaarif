import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-all-majalis-bayan',
  templateUrl: './all-majalis-bayan.component.html',
  styleUrls: ['./all-majalis-bayan.component.scss']
})
export class AllMajalisBayanComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataMolanaBayanList: any[] = [];
  filteredBayanList: any[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  selectedBayan: any;
  audioUrl: string | null = null;
  audioError = false;
  loading = false;
  loadingAudio = false;
  searchQuery = ''; // Filter input binding

  private readonly BASE_URL = 'http://apis.baitulmaarif.com/';

  constructor(
    private shortClipService: ApisService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getMolanaBayanList();
  }

  private getMolanaBayanList(): void {
    this.loading = true;
    const payload = {
      PageSize: this.pageSize,
      PageIndexSize: this.page,
      Filter: 'Majalis Hazrat Wala (D.B.)',
    };

    this.shortClipService.molanaBayanList(this.ShortClipModal).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.Status) {
          this.dataMolanaBayanList = response.Data;
          this.filteredBayanList = response.Data; // Initialize filtered list
          this.collectionSize = response.TotalCount;
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

  onPageChange(): void {
    this.getMolanaBayanList();
  }

  onPageSizeChange(): void {
    this.page = 1;
    this.getMolanaBayanList();
  }

  downloadFile(mp3Path: string, title: string): void {
    const downloadUrl = `${this.BASE_URL}${mp3Path}`;
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
      url: `${this.BASE_URL}${bayan.UrMp3Path}`,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) =>
        console.error('Error sharing bayan:', error)
      );
    } else {
      alert('Sharing is not supported in this browser.');
    }
  }

  openBayanModal(bayan: any, content: any): void {
    this.selectedBayan = bayan;
    this.audioUrl = `${this.BASE_URL}${bayan.UrMp3Path}`;
    this.audioError = false;
    this.loadingAudio = true;
    this.modalService.open(content, {
      centered: true,
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
  }

  handleAudioError(): void {
    this.loadingAudio = false;
    this.audioError = true;
  }

  onAudioLoad(): void {
    this.loadingAudio = false;
  }

  // New method to filter bayan list based on search input
  filterBayanList(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredBayanList = this.dataMolanaBayanList.filter((bayan) =>
      bayan.Title.toLowerCase().includes(query)
    );
  }

}

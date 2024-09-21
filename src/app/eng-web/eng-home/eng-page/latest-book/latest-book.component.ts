import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'latest-book',
  templateUrl: './latest-book.component.html',
  styleUrls: ['./latest-book.component.scss']
})
export class LatestBookComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  isLoading = true;
  baseUrl = 'http://apis.baitulmaarif.com/';
  dataLatestBooksList: any[] = [];
  currentPage = 1;
  pageSize = 5;  // Default page size for desktop
  totalItems = 0;
  selectedVideo: any;
  pdfUrl: string = '';

  @ViewChild('pdfModal') pdfModal?: TemplateRef<any>;

  constructor(private shortClipService: ApisService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getLatestBooksList();
  }  

  getLatestBooksList() {
    this.isLoading = true;
    this.shortClipService.latestBooksList(this.ShortClipModal).subscribe(
      (response: any) => {
        if (response.Status) {
          this.dataLatestBooksList = response.Data;
          this.totalItems = this.dataLatestBooksList.length;
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  openPdfModal(pdfPath: string) {
    this.pdfUrl = this.baseUrl + pdfPath;
    this.modalService.open(this.pdfModal, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
  }
  
  downloadPdf(pdfPath: any) {
    const link = document.createElement('a');
    link.href = this.baseUrl + pdfPath;
    link.download = pdfPath.split('/').pop(); // Extract file name from path
    link.click();
  }
  
  sharePdf(pdfPath: string) {
    const urlToShare = this.baseUrl + pdfPath;
  
    if (navigator.share) {
      navigator.share({
        title: 'Check out this book',
        url: urlToShare
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(urlToShare).then(() => {
        alert('PDF link copied to clipboard');
      });
    }
  }

}

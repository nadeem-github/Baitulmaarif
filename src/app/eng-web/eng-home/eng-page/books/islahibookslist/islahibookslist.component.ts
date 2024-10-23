import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortClipModal } from 'src/app/modals/ShortClipList';
import { UrduBook } from 'src/app/modals/UrduBook';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-islahibookslist',
  templateUrl: './islahibookslist.component.html',
  styleUrls: ['./islahibookslist.component.scss']
})
export class IslahibookslistComponent implements OnInit {

  ShortClipModal: ShortClipModal = new ShortClipModal();
  dataUrduBooks: any[] = []; // List of books
  page = 0;                  // Current page number
  pageSize = 10;              // Items per page
  collectionSize = 0;        // Total number of books (from API)
  baseURL = 'http://apis.baitulmaarif.com'; // API Base URL
  loading = false;           // Loading state

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private urduBooksService: ApisService
  ) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.loading = true;
    this.urduBooksService.UrduBooksList(this.ShortClipModal).subscribe({
      next: (response: any) => {
        this.loading = false;

        // Assuming the API response has { Data: [], TotalCount: number }
        if (response && response.Data) {
          this.dataUrduBooks = response.Data;
          
          this.collectionSize = response.TotalCount || this.dataUrduBooks.length;
        } else {
          console.warn('Invalid API response:', response);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching books:', error);
      }
    });
  }

  paginatedBooks(): any[] {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.dataUrduBooks.slice(start, end);
  }

  openPdf(url: string): void {
    window.open(this.getImageUrl(url), '_blank');
  }

  getImageUrl(path: string): string {
    return `${this.baseURL}/${path.replace(/\\/g, '/')}`;
  }

  onPageChange(): void {
  }

  onPageSizeChange(): void {
    this.page = 1; // Reset to the first page when page size changes
  }
}

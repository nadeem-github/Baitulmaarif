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
  dataUrduBooks: any[] = []; // Stores all fetched books
  page = 1;                  // Current page
  pageSize = 5;              // Default page size
  collectionSize = 0;        // Total number of books

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private urduBooksService: ApisService
  ) {}

  ngOnInit(): void {
    this.fetchBooks(); // Fetch data when the component loads
  }

  /**
   * Fetches books from the API and updates the data and pagination.
   */
  fetchBooks(): void {
    this.urduBooksService.UrduBooksList(this.ShortClipModal).subscribe(
      (response: any) => {
        if (response.Status) {
          this.dataUrduBooks = response.Data;
          this.collectionSize = response.TotalCount;
          console.log('Books:', this.dataUrduBooks);
        } else {
          console.warn('API response status is false');
        }
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  /**
   * Returns the books to be displayed on the current page.
   */
  paginatedBooks(): any[] {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.dataUrduBooks.slice(start, end);
  }

  /**
   * Opens a PDF in a new tab.
   */
  openPdf(url: string): void {
    window.open(this.getImageUrl(url), '_blank');
  }

  /**
   * Constructs the full URL for a book's image or PDF.
   */
  getImageUrl(path: string): string {
    return `http://apis.baitulmaarif.com/${path.replace('\\', '/')}`;
  }

  /**
   * Handles page changes triggered by pagination.
   */
  onPageChange(): void {
    console.log(`Page changed to: ${this.page}`);
  }

  /**
   * Updates the pagination when the page size is changed via the dropdown.
   */
  onPageSizeChange(): void {
    this.page = 1; // Reset to the first page whenever the page size changes
    this.collectionSize = this.dataUrduBooks.length; // Update total items count
    console.log(`Page size changed to: ${this.pageSize}`);
  }

}

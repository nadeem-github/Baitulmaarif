import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'latest-book',
  templateUrl: './latest-book.component.html',
  styleUrls: ['./latest-book.component.scss']
})
export class LatestBookComponent implements OnInit {

  items = [
    { name: 'Ek_Mint_Ka_Madarsa', imgUrl: 'assets/images/IslahiBookTitle/Ek_Mint_Ka_Madarsa.png', pdfUrl: 'assets/pdf/IslahiBooks/Ek_Mint_Ka_Madarsa.pdf' },
    { name: 'Islah-e-Akhlaq', imgUrl: 'assets/images/IslahiBookTitle/Islah-e-Akhlaq.png', pdfUrl: 'assets/pdf/IslahiBooks/Islah-e-Akhlaq.pdf' },
    { name: 'Majalis_e_Abrar', imgUrl: 'assets/images/IslahiBookTitle/Majalis_e_Abrar.png', pdfUrl: 'assets/pdf/IslahiBooks/Majalis_e_Abrar.pdf' }
  ];

  sanitizedPdfUrl!: SafeResourceUrl;

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) { }

  openPdfModal(modal: any, pdfUrl: string) {
    this.sanitizedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    this.modalService.open(modal, { size: 'lg' });
  }

  downloadPdf(pdfUrl: string, pdfName: string) {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${pdfName}.pdf`;
    link.click();
  }

  sharePdf(pdfUrl: string, pdfName: string) {
    if (navigator.share) {
      navigator.share({
        title: pdfName,
        url: pdfUrl
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in this browser.');
    }
  }

  ngOnInit(): void {
  }

}

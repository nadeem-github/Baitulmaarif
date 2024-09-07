import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-islahibookslist',
  templateUrl: './islahibookslist.component.html',
  styleUrls: ['./islahibookslist.component.scss']
})
export class IslahibookslistComponent implements OnInit {

  items = [
    {
      name: 'Ek Mint Ka Madarsa',
      writer: 'Hazrat Maulana Ashraf Ali Thanvi',
      topic: 'Islahe Nafs',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium assumenda quia nostrum.',
      imgUrl: 'assets/images/IslahiBookTitle/Ek_Mint_Ka_Madarsa.png',
      pdfUrl: 'assets/pdf/IslahiBooks/Ek_Mint_Ka_Madarsa.pdf'
    },
    {
      name: 'Islah e Akhlaq',
      writer: 'Hazrat Maulana Ashraf Ali Thanvi',
      topic: 'Islahe Nafs',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium assumenda quia nostrum.',
      imgUrl: 'assets/images/IslahiBookTitle/Islah-e-Akhlaq.png',
      pdfUrl: 'assets/pdf/IslahiBooks/Islah-e-Akhlaq.pdf'
    },
    {
      name: 'Majalis e Abrar',
      writer: 'Hazrat Maulana Ashraf Ali Thanvi',
      topic: 'Islahe Nafs',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium assumenda quia nostrum.',
      imgUrl: 'assets/images/IslahiBookTitle/Majalis_e_Abrar.png',
      pdfUrl: 'assets/pdf/IslahiBooks/Majalis_e_Abrar.pdf'
    },
    {
      name: 'Mawahib e Rabbania',
      writer: 'Hazrat Maulana Ashraf Ali Thanvi',
      topic: 'Islahe Nafs',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium assumenda quia nostrum.',
      imgUrl: 'assets/images/IslahiBookTitle/Mawahib_e_Rabbania.png',
      pdfUrl: 'assets/pdf/IslahiBooks/Mawahib_e_Rabbania.pdf'
    },
    {
      name: 'Mayiyat e Iillaheya',
      writer: 'Hazrat Maulana Ashraf Ali Thanvi',
      topic: 'Islahe Nafs',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium assumenda quia nostrum.',
      imgUrl: 'assets/images/IslahiBookTitle/Mayiyat-e-Iillaheya.png',
      pdfUrl: 'assets/pdf/IslahiBooks/Mayiyat-e-Iillaheya.pdf'
    },
    {
      name: 'Perdais Me Tazkarah_Vatan',
      writer: 'Hazrat Maulana Ashraf Ali Thanvi',
      topic: 'Islahe Nafs',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium assumenda quia nostrum.',
      imgUrl: 'assets/images/IslahiBookTitle/Perdais_Me_Tazkarah_Vatan.png',
      pdfUrl: 'assets/pdf/IslahiBooks/Perdais_Me_Tazkarah_Vatan.pdf'
    },
    {
      name: 'Piyary Nabi SAWW Ki Piyari Sunnatin',
      writer: 'Hazrat Maulana Ashraf Ali Thanvi',
      topic: 'Islahe Nafs',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium assumenda quia nostrum.',
      imgUrl: 'assets/images/IslahiBookTitle/Piyary-Nabi-SAWW-Ki-Piyari-Sunnatin.png',
      pdfUrl: 'assets/pdf/IslahiBooks/Piyary-Nabi-SAWW-Ki-Piyari-Sunnatin.pdf'
    },
    {
      name: 'Qalb E Saleem',
      writer: 'Hazrat Maulana Ashraf Ali Thanvi',
      topic: 'Islahe Nafs',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium assumenda quia nostrum.',
      imgUrl: 'assets/images/IslahiBookTitle/Qalb_e_Saleem.png',
      pdfUrl: 'assets/pdf/IslahiBooks/Qalb_e_Saleem.pdf'
    },
    {
      name: 'Rooh Ki Bimarian',
      writer: 'Hazrat Maulana Ashraf Ali Thanvi',
      topic: 'Islahe Nafs',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium assumenda quia nostrum.',
      imgUrl: 'assets/images/IslahiBookTitle/Rooh_Ki_Bimarian.png',
      pdfUrl: 'assets/pdf/IslahiBooks/Rooh_Ki_Bimarian.pdf'
    },
    {
      name: 'Waliullah Bananay Walay 4 Aamaal',
      writer: 'Hazrat Maulana Ashraf Ali Thanvi',
      topic: 'Islahe Nafs',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium assumenda quia nostrum.',
      imgUrl: 'assets/images/IslahiBookTitle/Waliullah_Bananay_Walay_4_Aamaal.png',
      pdfUrl: 'assets/pdf/IslahiBooks/Waliullah_Bananay_Walay_4_Aamaal.pdf'
    },
  ];

  sanitizedPdfUrl!: SafeResourceUrl;

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) { }

  openPdfModal(modal: any, pdfUrl: string) {
    this.sanitizedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    this.modalService.open(modal, { size: 'xl' });
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

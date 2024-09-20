import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quran-pdf',
  templateUrl: './quran-pdf.component.html',
  styleUrls: ['./quran-pdf.component.scss']
})
export class QuranPdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showImage13L: boolean = true;
  showImage15L: boolean = true;
  showImage15LArbic: boolean = true;

  toggleReadOnline13L() {
    this.showImage13L = !this.showImage13L;
  }

  toggleReadOnline15L() {
    this.showImage15L = !this.showImage15L;
  }
  
  toggleReadOnline15LArbic() {
    this.showImage15LArbic = !this.showImage15LArbic;
  }

  downloadPDF(fileName: string) {
    const link = document.createElement('a');
    link.href = `assets/pdf/${fileName}`;
    link.download = fileName;
    link.click();
  }

}

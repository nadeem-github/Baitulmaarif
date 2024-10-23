import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tafseer-book',
  templateUrl: './tafseer-book.component.html',
  styleUrls: ['./tafseer-book.component.scss']
})
export class TafseerBookComponent implements OnInit {

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}

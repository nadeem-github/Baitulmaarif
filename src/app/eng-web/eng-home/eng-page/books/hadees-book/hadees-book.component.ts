import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-hadees-book',
  templateUrl: './hadees-book.component.html',
  styleUrls: ['./hadees-book.component.scss']
})
export class HadeesBookComponent implements OnInit {

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}

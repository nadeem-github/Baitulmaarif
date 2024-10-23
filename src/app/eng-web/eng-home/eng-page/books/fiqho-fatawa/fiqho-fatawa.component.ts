import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-fiqho-fatawa',
  templateUrl: './fiqho-fatawa.component.html',
  styleUrls: ['./fiqho-fatawa.component.scss']
})
export class FiqhoFatawaComponent implements OnInit {

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}

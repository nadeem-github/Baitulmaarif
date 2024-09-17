import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weekly-majalis-popup',
  templateUrl: './weekly-majalis-popup.component.html',
  styleUrls: ['./weekly-majalis-popup.component.scss']
})
export class WeeklyMajalisPopupComponent implements OnInit {

  isImageLoaded: boolean = false;

  ngOnInit(): void {
  }

  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close();
  }

}

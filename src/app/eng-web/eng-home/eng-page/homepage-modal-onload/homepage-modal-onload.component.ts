import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'homepage-modal-onload',
  styleUrls: ['./homepage-modal-onload.component.scss'],
  templateUrl: './homepage-modal-onload.component.html',
})
export class HomepageModalOnloadComponent {
  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close();
  }

}

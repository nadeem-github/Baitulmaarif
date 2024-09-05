import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, Navigation, EffectCube, EffectCards, EffectCreative, Mousewheel, Keyboard } from "swiper";
import { HomepageModalOnloadComponent } from './eng-page/homepage-modal-onload/homepage-modal-onload.component';
import { WeeklyMajalisPopupComponent } from './eng-page/weekly-majalis-popup/weekly-majalis-popup.component';
SwiperCore.use([EffectCoverflow, Pagination, Autoplay, Navigation, EffectCube, EffectCards, EffectCreative, Mousewheel, Keyboard]);

@Component({
  selector: 'eng-home',
  templateUrl: './eng-home.component.html',
  styleUrls: ['./eng-home.component.scss'],
})
export class EngHomeComponent implements OnInit {

  count = 85265;
  duration = 10000;

  constructor(private modalService: NgbModal) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.openModalOnDelay();
    }, 3000);
  }

  openModalOnDelay() {
    this.modalService.open(HomepageModalOnloadComponent, { centered: true, size: 'md' });
  }
  
  weeklyMajalis() {
    this.modalService.open(WeeklyMajalisPopupComponent, { centered: true, size: 'lg' });
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

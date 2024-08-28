import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, Navigation, EffectCube, EffectCards, EffectCreative, Mousewheel, Keyboard } from "swiper";
import { HomepageModalOnloadComponent } from './eng-page/homepage-modal-onload/homepage-modal-onload.component';
SwiperCore.use([EffectCoverflow, Pagination, Autoplay, Navigation, EffectCube, EffectCards, EffectCreative, Mousewheel, Keyboard]);

@Component({
  selector: 'eng-home',
  templateUrl: './eng-home.component.html',
  styleUrls: ['./eng-home.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class EngHomeComponent implements OnInit {

  count = 85265;
  duration = 10000;

  isAudioPlaying: boolean = false;

  constructor(private modalService: NgbModal) {

  }

  increment() {

  }

  swiperConfig: any = {
    breakpoints: {
      425: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 10 },
      1024: { slidesPerView: 3, spaceBetween: 0 },
    }
  }

  audioList = [
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      // http://live.bazm.org:9002/live
      title: "Live Broadcast",
    }
  ];

  // audios = [
  //   {
  //     src: "https://webaudioapi.com/samples/metering/sounds/chrono.mp3",
  //     extension: "mp3",
  //     type: "audio/mp3"
  //   }
  // ];

  videoSource = "assets/video/short-clip-1.mp4";

  private subscription!: Subscription;

  public dateNow = new Date();
  public dDay = new Date('Oct 05 2024 12:30:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;


  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(x => { this.getTimeDifference(); });
    setTimeout(() => {
      this.openModalOnDelay();
    }, 3000);
  }

  openModalOnDelay() {
    this.modalService.open(HomepageModalOnloadComponent, { centered: true, size: 'md' });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  playAudio(action: boolean) {
    this.isAudioPlaying = action;
  }

  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 3, spaceBetween: 50 },
  };

  breakPointsToggle!: boolean;
  breakpointChange() {
    this.breakPointsToggle = !this.breakPointsToggle;
    this.breakpoints = {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 40 },
      1024: { slidesPerView: this.breakPointsToggle ? 7 : 5, spaceBetween: 50 },
    };
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

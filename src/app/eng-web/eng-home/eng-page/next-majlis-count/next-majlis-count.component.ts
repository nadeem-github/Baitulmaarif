import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'next-majlis-count',
  templateUrl: './next-majlis-count.component.html',
  styleUrls: ['./next-majlis-count.component.scss']
})
export class NextMajlisCountComponent implements OnInit {

  private subscription!: Subscription;

  public dateNow = new Date();
  public dDay!: Date;
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;
  public title: string = '';
  public heading: string = '';

  constructor(private timerService: ApisService) { }  // Inject TimerService

  ngOnInit(): void {
    // Fetch the timer data from service
    this.timerService.getNextMajlis().subscribe((data: any) => {
      this.dDay = new Date(data.TimerDate); // Set dDay from API
      this.title = data.Title;
      this.heading = data.Heading;
      
      // Start the countdown
      this.subscription = interval(1000).subscribe(() => this.getTimeDifference());
    });
  }

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
  
    // Check if the timer has ended
    if (this.timeDifference <= 0) {
      this.daysToDday = '00';
      this.hoursToDday = '00';
      this.minutesToDday = '00';
      this.secondsToDday = '00';
  
      // Show message that the next Majlis is coming soon
      this.heading = 'Next Majlis Coming Soon';
  
      // Optionally stop the interval to prevent unnecessary calculations
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    } else {
      this.allocateTimeUnits(this.timeDifference);
    }
  }
  

  private allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'total-visitors',
  templateUrl: './total-visitors.component.html',
  styleUrls: ['./total-visitors.component.scss']
})
export class TotalVisitorsComponent implements OnInit {
  count = 0;
  total = 9500;
  duration = 2000; // 5 seconds

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null, // use the viewport as the root
      threshold: 0.5, // trigger when 50% of the component is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startCountupTimer();
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, options);

    observer.observe(this.el.nativeElement);
  }

  private startCountupTimer() {
    const steps = 100;
    const intervalTime = this.duration / steps;

    const stepValue = this.total / steps;

    const timer = setInterval(() => {
      this.count += stepValue;
      if (this.count >= this.total) {
        this.count = this.total;
        clearInterval(timer);
      }
    }, intervalTime);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bayanat-mujahid-home',
  templateUrl: './bayanat-mujahid-home.component.html',
  styleUrls: ['./bayanat-mujahid-home.component.scss']
})
export class BayanatMujahidHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'juma-bayaan-home-page',
  templateUrl: './juma-bayaan-home-page.component.html',
  styleUrls: ['./juma-bayaan-home-page.component.scss']
})
export class JumaBayaanHomePageComponent implements OnInit {

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

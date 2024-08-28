import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eng-footer',
  templateUrl: './eng-footer.component.html',
  styleUrls: ['./eng-footer.component.scss']
})
export class EngFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  currentYear: number = new Date().getFullYear();
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

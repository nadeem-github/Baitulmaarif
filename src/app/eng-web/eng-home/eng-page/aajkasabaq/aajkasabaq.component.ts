import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aajkasabaq',
  templateUrl: './aajkasabaq.component.html',
  styleUrls: ['./aajkasabaq.component.scss']
})
export class AajkasabaqComponent implements OnInit {

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
